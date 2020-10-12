import React from 'react';
import { Button } from '@material-ui/core';
import { Box, AnimatedCheckmark } from 'Components/index';
import { LoginPageLayout } from './LoginPageLayout';
import { requestRoute } from 'History/index';

export const LoginEmailSent = () => {
  return (
    <LoginPageLayout>
      <Box.Center>
        <div>
          <AnimatedCheckmark />
          <Box color="#f2f2f2" fs="16px">
            <p>
              If your email is valid, you will receive a login link shortly.
            </p>
            <p>Check your inbox!</p>
          </Box>
          <Box.Row mt={2} jc="center">
            <Button
              style={{ color: '#f2f2f2' }}
              onClick={() => requestRoute('/login')}
            >
              Go Back
            </Button>
          </Box.Row>
        </div>
      </Box.Center>
    </LoginPageLayout>
  );
};
