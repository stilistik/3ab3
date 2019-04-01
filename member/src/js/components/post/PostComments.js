import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CommentList } from 'Components';
import CommentPost from './CommentPost';
import { POST_STATS } from './PostStats';

export const POST_COMMENTS = gql`
  query($postId: ID!, $first: Int, $after: String) {
    postComments(postId: $postId, first: $first, after: $after) {
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

class PostComments extends React.Component {
  more = (cursor) => {
    this.fetchMore({
      variables: {
        postId: this.props.postId,
        first: COUNT,
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.postComments.edges;
        const pageInfo = fetchMoreResult.postComments.pageInfo;

        return newEdges.length
          ? {
              postComments: {
                __typename: previousResult.postComments.__typename,
                edges: [...previousResult.postComments.edges, ...newEdges],
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
        query={POST_COMMENTS}
        variables={{ postId: this.props.postId, first: COUNT }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) return null;
          if (error) return null;
          this.fetchMore = fetchMore;
          const comments = data.postComments.edges.map((edge) => edge.node);
          const cursor = data.postComments.edges.length
            ? data.postComments.edges.slice(-1).pop().cursor
            : null;
          return (
            <div>
              <CommentPost
                postId={this.props.postId}
                refetch={[
                  {
                    query: POST_COMMENTS,
                    variables: { first: COUNT, postId: this.props.postId },
                  },
                  {
                    query: POST_STATS,
                    variables: { postId: this.props.postId },
                  },
                ]}
              />
              <CommentList
                comments={comments}
                more={this.more}
                hasNext={data.postComments.pageInfo.hasNextPage}
                cursor={cursor}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PostComments;
