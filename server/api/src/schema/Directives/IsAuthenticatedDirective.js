const { DirectiveLocation, GraphQLDirective } = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { AuthenticationError } = require('apollo-server-core');

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
      const next = field.resolve;

      field.resolve = async function(result, args, context, info) {
        if (!context.user) {
          throw new AuthenticationError({ message: 'Access token not found' });
        }
        console.log(context.user);
        const user = await context.prisma.user({ id: context.user.id });
        console.log(user);
        if (!user) {
          throw new AuthenticationError({ message: 'User not found' });
        }
        return result[field.name];
      };
    });
  }

  visitFieldDefinition(field) {
    field.resolve = async function(result, args, context) {
      if (!context.user) {
        throw new AuthenticationError({ message: 'Access token not found' });
      }

      const user = await context.prisma.user({ id: context.user.id });
      if (user) {
        return result[field.name];
      } else {
        throw new AuthenticationError({ message: 'User not found' });
      }
    };
  }
}

module.exports = IsAuthenticatedDirective;
