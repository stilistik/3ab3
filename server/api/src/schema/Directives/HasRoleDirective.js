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
    const requiredRole = this.args.requires;
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async (...args) => {
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
    });
  }

  visitFieldDefinition(field) {
    const requiredRole = this.args.requires;
    const fieldName = field.name;
    field.resolve = async function(result, args, context) {
      if (!requiredRole) return result[field.name];

      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });

      if (user.role === 'SUPER') return result[field.name];

      if (user.role !== requiredRole) {
        throw new AuthorizationError({
          message: `You are not authorized for field: ${fieldName}`,
        });
      } else {
        return result[field.name];
      }
    };
  }
}

module.exports = HasRoleDirective;
