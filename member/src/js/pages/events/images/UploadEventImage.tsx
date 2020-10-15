import { Icon, Message } from 'Components/index';
import React from 'react';
import { useMutation } from 'react-apollo';
import { IconButton } from '@material-ui/core';
import { EDIT_EVENT } from 'Graphql/mutations';
import { Event } from 'Graphql/types';

export interface UploadEventImageProps {
  event: Event;
  fieldId: 'flyer' | 'image';
  refetchQueries: () => any[];
}

export const UploadEventImage: React.FC<UploadEventImageProps> = ({
  event,
  fieldId,
  refetchQueries,
}) => {
  const [editEvent] = useMutation(EDIT_EVENT);

  const handleChange = (file: File) => {
    editEvent({
      variables: {
        eventId: event.id,
        input: {
          [fieldId]: file,
        },
      },
      refetchQueries,
    }).catch((error) => Message.error(error.message));
  };

  const id = `event-${fieldId}-upload`;
  return (
    <React.Fragment>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={id}
        type="file"
        onChange={(e) => handleChange(e.target.files[0])}
      />
      <label htmlFor={id}>
        <IconButton component="span">
          <Icon type="edit" />
        </IconButton>
      </label>
    </React.Fragment>
  );
};
