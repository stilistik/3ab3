import React from 'react';
import {
  Grid,
  Divider,
  Typography,
  Box,
  Paper,
  Button,
} from '@material-ui/core';
import { DefaultGrid, Form, TextField } from 'Components';
import { getQueryParams } from 'History';
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
});

export const ResetPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    const params = getQueryParams();
    console.log(params);
  }, []);

  const onSubmit = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <DefaultGrid overflow>
      <Box mt="60px">
        <Grid container justify="center">
          <Grid item xs={10} sm={6} md={5} lg={4} xl={4}>
            <Paper>
              <img
                className={classes.image}
                src="imgs/dinimami.png"
                alt="Not Found"
              />
              <Box p="20px">
                <Typography variant="h5">RESET PASSWORD</Typography>
                <Divider />
                <Box py="20px">
                  <Form onSubmit={onSubmit} className={classes.form}>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      required={true}
                    />
                    <TextField
                      id="confirm"
                      label="Confirm Password"
                      type="password"
                      required={true}
                    />
                    <Button color="secondary" variant="contained" type="submit">
                      Submit
                    </Button>
                  </Form>
                  {loading && (
                    <Container>
                      <Loading />
                    </Container>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DefaultGrid>
  );
};
