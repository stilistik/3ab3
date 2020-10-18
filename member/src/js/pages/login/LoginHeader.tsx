import React from 'react';
import { Typography } from '@material-ui/core';
import { Box } from 'Components/index';
import { useTranslation } from 'react-i18next';

export const LoginHeader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box.Row jc="center" color="#f2f2f2" mb={4}>
      <Typography variant="h3">{t('Login')}</Typography>
    </Box.Row>
  );
};
