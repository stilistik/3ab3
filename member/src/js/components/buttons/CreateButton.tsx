import React from 'react';
import { Fab, Divider } from '@material-ui/core';
import { Box, Icon } from 'Components/index';

interface CreateButtonProps {
  disableLine?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
  disableLine,
  onClick,
}) => {
  return (
    <Box.Row zIndex={1000}>
      {!disableLine && (
        <Box flexGrow={10} flexShrink={10} mr={2}>
          <Divider />
        </Box>
      )}
      <Fab color="primary" onClick={onClick}>
        <Icon type="add" />
      </Fab>
      {!disableLine && (
        <Box flexGrow={10} flexShrink={10} ml={2}>
          <Divider />
        </Box>
      )}
    </Box.Row>
  );
};

export default CreateButton;
