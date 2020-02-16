import React from 'react';
import { Divider, Typography, Box, Button, Paper } from '@material-ui/core';
import { Grid, Form, TextField, Message, Loading } from 'Components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    '& > div:not(:last-child)': {
      marginBottom: '20px',
    },
  },
  image: {
    width: '100%',
  },
  paper: {
    overflow: 'hidden',
  },
});

export const RequestReset = () => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const onSubmit = async (payload) => {
    setLoading(true);
    const response = await fetch(global.API_URL + '/auth/requestReset', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      Message.success('An email with a password reset link was sent do you.');
    } else {
      Message.error('Could not find your email in the system');
    }
    setLoading(false);
  };

  return (
    <Grid.Default>
      <Box mt="60px">
        <Grid container justify="center">
          <Grid item xs={10} sm={6} md={5} lg={4} xl={4}>
            <Paper className={classes.paper}>
              <img
                className={classes.image}
                src="imgs/annoyed.jpg"
                alt="Not Found"
              />
              <Box p="20px">
                <Typography variant="h5">REQUEST PASSWORD RESET</Typography>
                <Divider />
                <Box py="20px">
                  <Form onSubmit={onSubmit} className={classes.form}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      required={true}
                    />
                    <Button color="secondary" variant="contained" type="submit">
                      Submit
                    </Button>
                  </Form>
                  {loading && <Loading />}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid.Default>
  );
};
