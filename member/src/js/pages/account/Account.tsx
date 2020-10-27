import React from 'react';
import { AccountForm } from './AccountForm';
import { Typography, Paper, Divider } from '@material-ui/core';
import { Box, Grid, useCurrentUser } from 'Components/index';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect';
import { DarkModeToggle } from './DarkModeToggle';

export const Account: React.FC = () => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  return (
    <Grid.Default>
      <Box py="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              {t('Account').toUpperCase()}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={2} cmbnl={2}>
                <Typography variant="h4">{user.name}</Typography>
                <AccountForm user={user} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={2} cmbnl={2}>
                <LanguageSelect />
                <DarkModeToggle />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};
