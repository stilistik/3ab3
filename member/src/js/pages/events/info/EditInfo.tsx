import {
  Box,
  DateTimeField,
  FormDialog,
  Icon,
  Message,
  TextField,
} from 'Components/index';
import { Serializable } from 'Components/form/types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { IconButton } from '@material-ui/core';
import { EDIT_EVENT } from 'Graphql/mutations';
import { Event } from 'Graphql/types';
import { useTranslation } from 'react-i18next';

interface EditInfoProps {
  event: Event;
  refetchQueries: () => any[];
}

export const EditInfo: React.FC<EditInfoProps> = ({
  event,
  refetchQueries,
}) => {
  const [show, setShow] = React.useState(false);
  const [editEvent] = useMutation(EDIT_EVENT);
  const { t } = useTranslation();

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    editEvent({
      variables: {
        eventId: event.id,
        input: values,
      },
      refetchQueries,
    }).catch((error) => Message.error(error.message));
    setShow(false);
  };

  const handleClick = () => setShow(true);

  const handleCancel = () => setShow(false);

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        show={show}
        title={t('Edit Event Information')}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initValues={event}
      >
        <Box cmb={1}>
          <TextField id="title" label={t('Title')} required={true} />
          <TextField
            id="description"
            multiline={true}
            label={t('Description')}
            required={true}
          />
          <DateTimeField id="date" label={t('Date')} required={true} />
          <TextField id="place" label={t('Location')} />
          <TextField id="subtitle" label={t('Subtitle')} />
          <TextField id="spotify" label={t('Spotify')} />
          <TextField id="soundcloud" label={t('Soundcloud')} />
          <TextField id="youtube" label={t('Youtube')} />
          <TextField id="instagram" label={t('Instagram')} />
          <TextField id="facebook" label={t('Facebook')} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
