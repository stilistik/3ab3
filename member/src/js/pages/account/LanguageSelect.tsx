import React from 'react';
import { Language, useLanguage } from 'App/intl';
import { Box } from 'Components/index';
import { MenuItem, Select, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const LanguageSelect: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string;
      value: Language;
    }>
  ) => {
    changeLanguage(e.target.value);
  };

  return (
    <Box.Row mb={1} cmrnl={2}>
      <Typography variant="body1">{t('Language')}</Typography>
      <Select value={language} onChange={handleChange}>
        <MenuItem value={Language.deCH}>Bärndütsch</MenuItem>
        <MenuItem value={Language.en}>English</MenuItem>
        <MenuItem value={Language.de}>Deutsch</MenuItem>
      </Select>
    </Box.Row>
  );
};
