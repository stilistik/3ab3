import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Serializable } from 'Components/form/types';
import {
  Box,
  FormDialog,
  Icon,
  Message,
  QuickNumberField,
} from 'Components/index';
import { Item, Product, Transaction } from 'Graphql/types';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from 'react-apollo';
import { EDIT_PURCHASE } from 'Graphql/mutations';
import {
  BALANCE_TABLE,
  CURRENT_USER_BALANCE,
  CURRENT_USER_TRANSACTIONS,
  PRODUCT_LIST,
  PURCHASE,
} from 'Graphql/queries';
import { getBackendUrl } from 'App/network/Utils';

interface ActionCellProps {
  transaction: Transaction;
  refetch: () => Promise<any>;
}

export const EditPurchase: React.FC<ActionCellProps> = ({
  transaction,
  refetch,
}) => {
  const { t } = useTranslation();
  const [editPurchase] = useMutation(EDIT_PURCHASE);
  const [show, setShow] = React.useState(false);

  const [
    loadPurchase,
    { called: calledPurchase, data: purchaseData },
  ] = useLazyQuery(PURCHASE, {
    variables: {
      purchaseId: transaction.purchase.id,
    },
  });

  const [
    loadProducts,
    { called: calledProducts, data: productsData },
  ] = useLazyQuery(PRODUCT_LIST);

  React.useEffect(() => {
    if (show) {
      if (!calledPurchase) loadPurchase();
      if (!calledProducts) loadProducts();
    }
  }, [show]);

  const handleClick = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (values: NestedRecord<Serializable>) => {
    const items = Object.keys(values).map((key) => ({
      productId: key,
      amount: values[key],
    }));

    editPurchase({
      variables: {
        purchaseId: transaction.purchase.id,
        input: { userId: transaction.user.id, items },
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

  function getInitValues() {
    const initValues: Record<string, number> = {};
    if (purchaseData) {
      purchaseData.purchase.items.forEach((item: Item) => {
        initValues[item.product.id] = item.amount;
      });
    }
    return initValues;
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="edit" />
      </IconButton>
      <FormDialog
        title={t('Edit Purchase')}
        show={show}
        onCancel={handleClose}
        onSubmit={handleSubmit}
        initValues={getInitValues()}
      >
        {show &&
          productsData &&
          productsData.products.map((product: Product) => {
            return (
              <Box.Row key={product.id} cmrnl={1} cmb={1}>
                <Avatar
                  src={getBackendUrl() + product.thumbnail}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
                <QuickNumberField
                  id={product.id}
                  label={product.name}
                  required={false}
                  defaultValue={0}
                />
              </Box.Row>
            );
          })}
      </FormDialog>
    </React.Fragment>
  );
};
