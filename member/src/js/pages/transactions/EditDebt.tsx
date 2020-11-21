import React from 'react';
import { IconButton } from '@material-ui/core';
import { Serializable } from 'Components/form/types';
import {
  Box,
  FormDialog,
  Icon,
  NumberField,
  TextField,
  Message,
} from 'Components/index';
import { Transaction } from 'Graphql/types';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo';
import { EDIT_NANOCREDIT } from 'Graphql/mutations';
import {
  BALANCE_TABLE,
  CURRENT_USER_BALANCE,
  CURRENT_USER_TRANSACTIONS,
} from 'Graphql/queries';

interface EditDebtProps {
  transaction: Transaction;
  refetch: () => Promise<any>;
}

export const EditDebt: React.FC<EditDebtProps> = ({
  transaction,
  refetch,
}) => {
  const { t } = useTranslation();
  const [editDebt] = useMutation(EDIT_DEBT);
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSubmit = (values: NestedRecord<Serializable>) => {
    editDebt({
      variables: {
        userId: transaction.user.id,
        debtId: transaction.debt.id,
        input: values,
      },
      refetchQueries: () => [
        { query: CURRENT_USER_BALANCE },
        { query: BALANCE_TABLE },
        { query: CURRENT_USER_TRANSACTIONS, variables: { first: 10, skip: 0 } },
      ],
    })
      .then(() => refetch())
      .then(() => {
        Message.success('Edit successful');
        handleClose();
      })
      .catch((error) => Message.error(error.message));
  };
  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        title={t('Edit Debt')}
        show={show}
        onCancel={handleClose}
        onSubmit={handleSubmit}
        initValues={transaction.debt}
      >
        <Box cmb={1}>
          <TextField
            id="description"
            label={t('Description')}
            required={true}
          />
          <NumberField id="amount" label={t('Amount')} required={true} />
        </Box>
      </FormDialog>
    </React.Fragment>
  );
};
