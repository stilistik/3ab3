const {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} = require('graphql');
const jwt = require('jsonwebtoken');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { AuthenticationError } = require('./errors');

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyAndDecodeToken = (context) => {
  if (
    !context ||
    !context.headers ||
    (!context.headers.authorization && !context.headers.Authorization)
  ) {
    throw new AuthenticationError({ message: 'Could not find access token' });
  }

  const token = context.headers.authorization || context.headers.Authorization;
  try {
    const id_token = token.replace('Bearer ', '');
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error('Could not find access token secret');
    }
    const decoded = jwt.verify(id_token, ACCESS_TOKEN_SECRET);

    return decoded;
  } catch (err) {
    throw new AuthenticationError({
      message: 'You are not authorized for this resource',
    });
  }
};

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
      field.resolve = async (...args) => {
        const context = args[2];
        verifyAndDecodeToken(context);
        return resolve.apply(this, args);
      };
    });
  }

  visitFieldDefinition(field) {
    field.resolve = async function(result, args, context) {
      const { id } = verifyAndDecodeToken(context);
      const user = await context.prisma.user({ id: id });
      if (user) {
        return result[field.name];
      } else {
        throw new AuthenticationError({ message: 'User not found' });
      }
    };
  }
}

module.exports = IsAuthenticatedDirective;
