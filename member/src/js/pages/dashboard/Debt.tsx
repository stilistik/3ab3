import React from 'react';
import {
  Box,
  Form,
  Message,
  NumberField,
  TextField,
  UserSelectField,
} from 'Components/index';
import { Paper, Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Serializable, FieldOptions } from 'Components/form/types';
import { useMutation } from 'react-apollo';
import { CREATE_DEBT } from 'Graphql/mutations';
import {
  BALANCE_TABLE,
  CURRENT_USER_BALANCE,
  GLOBAL_BALANCE_CHART,
} from 'Graphql/queries';

interface DebtProps {
  onSubmit: (
    values: NestedRecord<Serializable>,
    options: NestedRecord<FieldOptions>
  ) => void;
}

const DebtForm: React.FC<DebtProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSubmit} initAfterSubmit={true}>
      <Box cmb={1}>
        <UserSelectField id="user" label={t('Member')} required={true} />
        <TextField id="description" label={t('Description')} required={true} />
        <NumberField id="amount" label={t('Amount')} required={true} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          {t('Register Debt')}
        </Button>
      </Box>
    </Form>
  );
};

export const Debt: React.FC = () => {
  const { t } = useTranslation();
  const [createDebtItem] = useMutation(CREATE_DEBT);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    const { user, ...rest } = values;
    createDebtItem({
      variables: {
        userId: user,
        input: rest,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_BALANCE },
        { query: GLOBAL_BALANCE_CHART },
        { query: BALANCE_TABLE },
      ],
    })
      .then(() => {
        Message.success('success');
      })
      .catch((error) => {
        Message.error(error.message);
      });
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">{t('Register Debt')}</Typography>
        <Typography variant="body2"></Typography>
        <DebtForm onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
};
