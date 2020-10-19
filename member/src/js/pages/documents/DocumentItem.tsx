import React from 'react';
import { Document as DocumentType } from 'Graphql/types';
import { getBackendUrl } from 'App/network/Utils';
import { Box, Icon, LazyLoadingImage, Loading } from 'Components/index';

interface DocumentItemProps {
  document: DocumentType;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
  return (
    <Box border={1} borderColor="divider">
      <LazyLoadingImage width="100%" src={document.thumbnail} />
    </Box>
  );
};
