import { useQuery } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';

interface UsePaginatedQueryReturn<T> {
  fetchMore: (cursor: string) => void;
  hasNext: boolean;
  cursor: string | null;
  nodes: Array<T>;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
}

export function usePaginatedQuery<T>(
  query: DocumentNode,
  first: number,
  after: string = null
): UsePaginatedQueryReturn<T> {
  const queryName = (query as any).definitions[0].selectionSet.selections[0]
    .name.value;

  const { loading, error, data, fetchMore: _fetchMore, refetch } = useQuery(query, {
    variables: { first, after },
  });

  const fetchMore = (cursor: string) => {
    _fetchMore({
      variables: {
        first: first,
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult[queryName].edges;
        const pageInfo = fetchMoreResult[queryName].pageInfo;

        return newEdges.length
          ? {
              [queryName]: {
                __typename: previousResult[queryName].__typename,
                edges: [...previousResult[queryName].edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  if (data) {
    const nodes = data[queryName].edges.map((edge: any) => edge.node);
    const cursor = data[queryName].edges.length
      ? data[queryName].edges.slice(-1).pop().cursor
      : null;
    const hasNext = data[queryName].pageInfo.hasNextPage;

    return { fetchMore, refetch, hasNext, cursor, nodes, loading: false, error: null };
  }

  return { loading, error, fetchMore, refetch, hasNext: false, nodes: [], cursor: null };
}
