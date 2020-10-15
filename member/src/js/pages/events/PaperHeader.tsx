import React from 'react';
import { Typography } from '@material-ui/core';
import { Box } from 'Components/index';

interface PaperHeaderProps {
  title: string;
}

export const PaperHeader: React.FC<PaperHeaderProps> = ({
  title,
  children,
}) => {
  return (
    <Box.Row
      jc="space-between"
      borderBottom={1}
      borderColor="divider"
      px={2}
      py={0.5}
    >
      <Typography variant="h6">{title}</Typography>
      <Box.Row cmrnl={1}>{children}</Box.Row>
    </Box.Row>
  );
};
