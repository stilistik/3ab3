const {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { AuthorizationError } = require('../../auth/errors');
const verifyAndDecodeToken = require('../../auth/verify');

class HasRoleDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'hasRole',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
      args: {
        requires: {
          type: schema.getType('UserRole'),
          defaultValue: 'ADMIN',
        },
      },
    });
  }

  visitObject(obj) {
    const fields = obj.getFields();
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      return this.testRole(field);
    });
  }

  visitFieldDefinition(field) {
    return this.testRole(field);
  }

  testRole(field) {
    const requiredRole = this.args.requires;
    const fieldName = field.name;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const context = args[2];
      if (!requiredRole) return resolve.apply(this, args);

      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });

      if (user.role === 'SUPER') return resolve.apply(this, args);

      if (user.role !== requiredRole) {
        throw new AuthorizationError({
          message: `You are not authorized for field: ${fieldName}`,
        });
      } else {
        return resolve.apply(this, args);
      }
    };
  }
}

module.exports = HasRoleDirective;
