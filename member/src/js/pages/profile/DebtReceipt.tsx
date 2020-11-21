import React from 'react';
import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Debt } from 'Graphql/types';

interface DebtReceiptProps {
  open: boolean;
  debt: Debt;
  handleClose: () => void;
}

export const DebtReceipt: React.FC<DebtReceiptProps> = ({
  open,
  debt,
  handleClose,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t('Purchase Receipt')}</DialogTitle>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">{t('Debt')}</TableCell>
              <TableCell align="left">{debt.description}</TableCell>
              <TableCell align="right">
                {debt.amount.toFixed(2)} CHF
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};
