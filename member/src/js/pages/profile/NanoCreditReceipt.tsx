import React from 'react';
import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NanoCredit } from 'Graphql/types';

interface NanoCreditReceipt {
  open: boolean;
  nanocredit: NanoCredit;
  handleClose: () => void;
}

export const NanoCreditReceipt: React.FC<NanoCreditReceipt> = ({
  open,
  nanocredit,
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
              <TableCell align="left">{t('Nano Credit')}</TableCell>
              <TableCell align="left">{nanocredit.description}</TableCell>
              <TableCell align="right">
                {nanocredit.amount.toFixed(2)} CHF
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};
