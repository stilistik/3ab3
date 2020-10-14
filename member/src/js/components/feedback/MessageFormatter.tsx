const GRAPHQL_ERROR_STRING = 'GraphQL error:';

export class MessageFormatter {
  public static formatMessage(msg: string): string {
    if (msg.includes(GRAPHQL_ERROR_STRING)) return this.formatGraphQLErrorMessage(msg);
    return msg;
  }

  private static formatGraphQLErrorMessage = (msg: string): string => {
    return msg.replace(GRAPHQL_ERROR_STRING, '').trim();
  };
}
