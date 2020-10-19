import React from 'react';
import { useQuery } from 'react-apollo';
import { Box, Grid, Loading, Error } from 'Components/index';
import { DOCUMENT_LIST } from 'Graphql/queries';
import { Document } from 'Graphql/types';
import { UploadDocument } from './UploadDocument';
import { DocumentItem } from './DocumentItem';

export const Documents: React.FC = () => {
  const { loading, error, data } = useQuery(DOCUMENT_LIST);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Grid.Default>
      <Box py="20px">
        <UploadDocument />
        <Grid container spacing={3}>
          {data.documents.map((el: Document) => {
            return (
              <Grid key={el.id} item xs={6} sm={4} md={3} lg={2}>
                <DocumentItem document={el} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grid.Default>
  );
};
