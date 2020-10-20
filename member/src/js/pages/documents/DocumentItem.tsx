import React from 'react';
import { Document as DocumentType } from 'Graphql/types';
import { Box, LazyLoadingImageDiv } from 'Components/index';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { getBackendUrl } from 'App/network/Utils';
import { EditDocument } from './EditDocument';

interface DocumentItemProps {
  document: DocumentType;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
  const filePath = getBackendUrl() + document.file.uri;

  return (
    <Card style={{ position: 'relative' }}>
      <Box pos="absolute" top={10} right={10}>
        <EditDocument document={document} />
      </Box>
      <LazyLoadingImageDiv
        width="100%"
        height="180px"
        src={document.thumbnail}
        backgroundPosition="top center"
      />
      <CardActionArea onClick={() => window.open(filePath, '_blank')}>
        <Box borderTop={1} borderColor="divider">
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            >
              {document.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '13px',
              }}
            >
              {new Date(document.createdAt).toDateString()}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};
