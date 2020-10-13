import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Paper, Slider, Button, Typography } from '@material-ui/core';
import {
  Tag,
  Box,
  Loading,
  Error,
  UserAvatar,
  Message,
} from 'Components/index';
import { USERS_WITH_DEBT } from 'Graphql/queries';
import { SEND_PAYMENT_REMIDER } from 'Graphql/mutations';

interface AffectedUserListProps {
  threshold: number;
}

const AffectedUserList: React.FC<AffectedUserListProps> = ({ threshold }) => {
  const [sendPaymentReminder] = useMutation(SEND_PAYMENT_REMIDER);

  const { loading, error, data } = useQuery(USERS_WITH_DEBT, {
    variables: { threshold: -threshold },
  });

  if (data) {
    const { usersWithDebt } = data;

    const handleSubmit = () => {
      sendPaymentReminder({
        variables: {
          userIds: usersWithDebt.map((user: any) => user.id),
        },
      })
        .then(() => {
          Message.success('Payment notification emails sent.');
        })
        .catch((err) => {
          Message.error(err.message);
        });
    };

    return (
      <Box cmb={1}>
        <Typography variant="body1">Affected Members</Typography>
        {usersWithDebt.map((user: any) => (
          <Box.Row key={user.id} cmrnl={1} mb={1}>
            <UserAvatar user={user} classes={{}} className="" style={{}} />
            <Typography variant="h6">{user.name}</Typography>
            <Tag outlined color="#f5222d">
              {user.balance.toFixed(2) + 'CHF'}
            </Tag>
          </Box.Row>
        ))}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!usersWithDebt.length}
        >
          Send Emails
        </Button>
      </Box>
    );
  }
  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;
};

interface ThresholdSliderProps {
  threshold: number;
  onChange: (value: number) => void;
}

const ThresholdSlider: React.FC<ThresholdSliderProps> = ({
  threshold,
  onChange,
}) => {
  const [value, setValue] = React.useState(threshold);

  const handleChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    value: number
  ) => {
    onChange(value);
  };

  const handleChange = (_event: React.ChangeEvent<{}>, value: number) => {
    setValue(value);
  };

  return (
    <Box.Row>
      <Slider
        min={1}
        max={300}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
      />
      <Box.Row ml={1} whiteSpace="nowrap">
        <Typography variant="body2">{value} CHF</Typography>
      </Box.Row>
    </Box.Row>
  );
};

export const PaymentReminder = () => {
  const [threshold, setThreshold] = React.useState(30);

  const handleChange = (value: number) => setThreshold(value);

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">Payment Notifier</Typography>
        <Typography variant="body1">Threshold CHF</Typography>

        <ThresholdSlider threshold={threshold} onChange={handleChange} />
        <AffectedUserList threshold={threshold} />
      </Box>
    </Paper>
  );
};
