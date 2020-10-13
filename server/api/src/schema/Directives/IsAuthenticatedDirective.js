const {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { AuthenticationError } = require('../../auth/errors');
const { verifyAndDecodeToken } = require('../../auth/verify');

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration() {
    return new GraphQLDirective({
      name: 'isAuthenticated',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
    });
  }

  visitObject(obj) {
    const fields = obj.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args) {
        const context = args[2];
        verifyAndDecodeToken(context);
        return resolve.apply(this, args);
      };
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const context = args[2];
      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });
      if (user) {
        return resolve.apply(this, args);
      } else {
        throw new AuthenticationError({ message: 'User not found' });
      }
    };
  }
}

module.exports = IsAuthenticatedDirective;
