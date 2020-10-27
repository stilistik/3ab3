import React from 'react';
import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';

const QUERY = gql`
  query($purchaseId: ID!) {
    purchase(purchaseId: $purchaseId) {
      id
      total
      items {
        id
        product {
          name
          price
        }
        price
        amount
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `2px solid ${theme.palette.divider}`,
  },
  cell: {
    color: theme.palette.text.primary,
  },
}));

export const PurchaseReceipt = ({ open, purchaseId, handleClose }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { loading, error, data } = useQuery(QUERY, {
    variables: { purchaseId },
  });

  if (loading || error) return null;

  const { items } = data.purchase;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t('Purchase Receipt')}</DialogTitle>
      <Table>
        <TableBody>
          {items.map((item) => {
            if (!item.amount) return null;
            return (
              <TableRow key={item.id}>
                <TableCell align="left">{item.product.name}</TableCell>
                <TableCell align="right">{item.amount}</TableCell>
                <TableCell align="right">{item.price} CHF</TableCell>
                <TableCell align="right">
                  {(item.price * item.amount).toFixed(2)} CHF
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter className={styles.footer}>
          <TableRow>
            <TableCell colSpan={4} className={styles.cell}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography>Total</Typography>
                <Typography>{data.purchase.total} CHF</Typography>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Dialog>
  );
};
