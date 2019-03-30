import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Feed from './Feed';

export const FEED = gql`
  query($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          author {
            id
            name
            avatar
          }
          date
          text
          image
        }
      }
    }
  }
`;

const COUNT = 10;

class FeedManager extends React.Component {
  more = (cursor) => {
    this.fetchMore({
      variables: {
        first: COUNT,
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.feed.edges;
        const pageInfo = fetchMoreResult.feed.pageInfo;

        return newEdges.length
          ? {
              // Put the new comments at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              feed: {
                __typename: previousResult.feed.__typename,
                edges: [...previousResult.feed.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  render() {
    return (
      <Query query={FEED} variables={{ first: COUNT }}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) return null;
          if (error) return null;
          this.fetchMore = fetchMore;
          const posts = data.feed.edges.map((edge) => edge.node);
          const cursor = data.feed.edges.slice(-1).pop().cursor;
          return (
            <Feed
              posts={posts}
              more={this.more}
              hasNext={data.feed.pageInfo.hasNextPage}
              cursor={cursor}
              refetch={[{ query: FEED, variables: { first: COUNT } }]}
            />
          );
        }}
      </Query>
    );
  }
}

export default FeedManager;
