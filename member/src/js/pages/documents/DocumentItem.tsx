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

interface DocumentItemProps {
  document: DocumentType;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
  const filePath = getBackendUrl() + document.file.uri;

  return (
    <Card>
      <CardActionArea onClick={() => window.open(filePath, '_blank')}>
        <LazyLoadingImageDiv
          width="100%"
          height="180px"
          src={document.thumbnail}
          backgroundPosition="top center"
        />
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
