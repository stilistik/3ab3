import React from 'react';
import { Message, Box, Icon, Form, TextField, Loading } from 'Components/index';
import { makeStyles, Fab } from '@material-ui/core';
import { LoginHeader } from './LoginHeader';
import { LoginPageLayout } from './LoginPageLayout';
import { requestEmail } from 'Auth/requestEmail';
import { requestRoute } from 'App/router/History';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    color: '#f2f2f2',
    '&:before': { borderBottomColor: '#919191' },
    '&&:hover:before': { borderBottomColor: '#919191' },
    '&:after': { borderBottomColor: '#f2f2f2' },
  },
  label: { color: '#f2f2f2', '&.Mui-focused': { color: '#f2f2f2' } },
});

export const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const styles = useStyles();
  const { t } = useTranslation();

  const onSubmit = async (values: { email: string }) => {
    try {
      setLoading(true);
      await requestEmail(values.email);
      requestRoute('/loginsent');
    } catch (error) {
      Message.error(error.message);
    }
  };

  return (
    <LoginPageLayout>
      <LoginHeader />
      <Form className={styles.form} onSubmit={onSubmit}>
        <TextField
          id="email"
          label={t('Email')}
          type="email"
          required={true}
          classes={{
            input: { root: styles.input },
            label: { root: styles.label },
          }}
        />
        <Fab
          size="large"
          type="submit"
          color="primary"
          variant="extended"
          style={{ marginTop: 20 }}
        >
          <Icon type="mail" />
          <Box ml={1}>{t('Request Login Link')}</Box>
        </Fab>
        {loading && (
          <Box mt={3}>
            <Loading color="#f2f2f2" />
          </Box>
        )}
      </Form>
    </LoginPageLayout>
  );
};

export default LoginForm;