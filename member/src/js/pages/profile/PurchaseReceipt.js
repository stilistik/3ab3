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
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
        amount
      }
    }
  }
`;

export const PurchaseReceipt = ({ open, purchaseId, handleClose }) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { purchaseId },
  });

  if (loading || error) return null;

  const { items } = data.purchase;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Purchase Receipt</DialogTitle>
      <Table>
        <TableBody>
          {items.map((item) => {
            if (!item.amount) return null;
            return (
              <TableRow key={item.id}>
                <TableCell align="left">{item.product.name}</TableCell>
                <TableCell align="right">{item.amount}</TableCell>
                <TableCell align="right">{item.product.price} CHF</TableCell>
                <TableCell align="right">
                  {item.product.price * item.amount} CHF
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter style={{ borderTop: '2px solid black' }}>
          <TableRow>
            <TableCell colSpan={4}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#222',
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
