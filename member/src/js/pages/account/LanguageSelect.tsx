import React from 'react';
import i18n from 'App/i18n/i18n';
import { Box } from 'Components/index';
import { MenuItem, Select, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function getInitialLanguage() {
  return window.localStorage.getItem('lang') || 'chBE';
}

export const LanguageSelect: React.FC = () => {
  const [lang, setLang] = React.useState(getInitialLanguage());
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string;
      value: string;
    }>
  ) => {
    const { value } = e.target;
    i18n.changeLanguage(value);
    setLang(value);
    window.localStorage.setItem('lang', value);
  };

  return (
    <Box cmb={1}>
      <Typography variant="body1">{t('Language')}</Typography>
      <Select value={lang} onChange={handleChange}>
        <MenuItem value={'chBE'}>Bärndütsch</MenuItem>
        <MenuItem value={'en'}>English</MenuItem>
      </Select>
    </Box>
  );
};
