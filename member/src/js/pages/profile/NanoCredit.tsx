import React from 'react';
import { Box, Form, NumberField } from 'Components/index';
import { Paper, Typography, Button } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { Serializable, FieldOptions } from 'Components/form/types';

interface NanoCreditProps {
  onSubmit: (
    values: NestedRecord<Serializable>,
    options: NestedRecord<FieldOptions>
  ) => void;
}

const NanoCreditForm: React.FC<NanoCreditProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSubmit}>
      <Box cmb={1}>
        <NumberField id="amount" label={t('Amount')} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          {t('Take out credit')}
        </Button>
      </Box>
    </Form>
  );
};

export const NanoCredit: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (values: NestedRecord<Serializable>) => {};

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">{t('Nano Credit')}</Typography>
        <Typography variant="body2">
          <Trans i18nKey="nanoCreditExplanation">
            Here you can take out a nano credit. After registering it, you can
            take the corresponding amount from the cash register and use it as
            you please. The maximum amount you can take out is 50 CHF.
          </Trans>
        </Typography>
        <NanoCreditForm onSubmit={handleSubmit} />
      </Box>
    </Paper>
  );
};
