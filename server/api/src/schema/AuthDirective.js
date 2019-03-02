const {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} = require('graphql');
const {
  ForbiddenError,
  SchemaDirectiveVisitor,
} = require('apollo-server-express');

class AuthDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    const previousDirective = schema.getDirective(directiveName);
    if (previousDirective) {
      previousDirective.args.forEach((arg) => {
        if (arg.name === 'requires') {
          arg.defaultValue = 'ADMIN';
        }
      });

      return previousDirective;
    }

    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.OBJECT, DirectiveLocation.FIELD_DEFINITION],
      args: {
        requires: {
          type: schema.getType('Role'),
          defaultValue: 'ADMIN',
        },
      },
    });
  }

  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type.requiredAuthRole = this.args.requires;
    type.isSelf = this.args.self;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field.requiredAuthRole = this.args.requires;
    field.isSelf = this.args.self;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType.authFieldsWrapped) {
      return;
    }

    objectType.authFieldsWrapped = true;
    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async (...args) => {
        const requiredRole =
          field.requiredAuthRole || objectType.requiredAuthRole;

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const { user } = args[2];

        if (user.role === 'SUPER') {
          return resolve.apply(this, args);
        }

        if (user.role !== requiredRole) {
          throw new ForbiddenError(
            `User does not have the required role (${requiredRole}) on field: ${fieldName}.`
          );
        }

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = AuthDirective;
