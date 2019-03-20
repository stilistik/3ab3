import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { DefaultGrid, Form, Field } from 'Components';
import { Button } from '@material-ui/core';

import styles from './Home.css';

const QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

class Home extends React.Component {
  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    if (!this.props.users) return null;
    return (
      <DefaultGrid>
        <div className={styles.container}>
          <Form className={styles.form} onSubmit={this.onSubmit}>
            <Field id="email" name="Email" type="email" required={true} />
            <Field
              id="password"
              name="Password"
              type="password"
              required={true}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Form>
        </div>
      </DefaultGrid>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({ users: data.users }),
})(Home);
