import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CommentList } from 'Components';
import CommentEvent from './CommentEvent';
import { EVENT_STATS } from './EventStats';

export const EVENT_COMMENTS = gql`
  query($eventId: ID!, $first: Int, $after: String) {
    eventComments(eventId: $eventId, first: $first, after: $after) {
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
          text
          date
        }
      }
    }
  }
`;

const COUNT = 5;

class EventComments extends React.Component {
  more = (cursor) => {
    this.fetchMore({
      variables: {
        postId: this.props.postId,
        first: COUNT,
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.eventComments.edges;
        const pageInfo = fetchMoreResult.eventComments.pageInfo;

        return newEdges.length
          ? {
              eventComments: {
                __typename: previousResult.eventComments.__typename,
                edges: [...previousResult.eventComments.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  render() {
    return (
      <Query
        query={EVENT_COMMENTS}
        variables={{ eventId: this.props.eventId, first: COUNT }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) return null;
          if (error) return null;
          this.fetchMore = fetchMore;
          const comments = data.eventComments.edges.map((edge) => edge.node);
          const cursor = data.eventComments.edges.length
            ? data.eventComments.edges.slice(-1).pop().cursor
            : null;
          return (
            <div>
              <CommentEvent
                eventId={this.props.eventId}
                refetch={[
                  {
                    query: EVENT_COMMENTS,
                    variables: { first: COUNT, eventId: this.props.eventId },
                  },
                  {
                    query: EVENT_STATS,
                    variables: { eventId: this.props.eventId },
                  },
                ]}
              />
              <CommentList
                comments={comments}
                more={this.more}
                hasNext={data.eventComments.pageInfo.hasNextPage}
                cursor={cursor}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default EventComments;
