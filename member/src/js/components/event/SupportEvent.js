import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Icon } from 'Components';
import classnames from 'classnames';

import styles from './SupportEvent.less';

const SUPPORT_QUERY = gql`
  query($eventId: ID!) {
    event(eventId: $eventId) {
      id
      supporters {
        id
      }
    }
  }
`;

const MIN_SUPPORT = 5;

const SupportProgress = ({ event, children, className, size, thickness }) => {
  const { loading, error, data } = useQuery(SUPPORT_QUERY, {
    variables: { eventId: event.id },
  });
  if (loading || error) return null;

  const supporterCount = data.event.supporters.length;
  const progress = (supporterCount / MIN_SUPPORT) * 100;

  return (
    <div className={className}>
      <div className={styles.progressContainer}>
        <CircularProgress
          className={styles.progress}
          classes={{
            circle: styles.background,
          }}
          size={size}
          thickness={thickness}
          variant="static"
          value={100}
        />
        <CircularProgress
          className={styles.progress}
          classes={{
            circle: styles.foreground,
          }}
          size={size}
          thickness={thickness}
          variant="static"
          value={progress}
        />
        {children}
      </div>
    </div>
  );
};

SupportProgress.defaultProps = {
  size: 66,
  thickness: 4,
};

const USER = gql`
  query {
    currentUser {
      id
      supportedEvents {
        id
      }
    }
  }
`;

const SUPPORT = gql`
  mutation($userId: ID!, $eventId: ID!) {
    supportEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

const UNSUPPORT = gql`
  mutation($userId: ID!, $eventId: ID!) {
    unsupportEvent(userId: $userId, eventId: $eventId) {
      id
    }
  }
`;

const SupportEvent = (props) => {
  const [supportEvent] = useMutation(SUPPORT);
  const [unsupportEvent] = useMutation(UNSUPPORT);
  const { loading, error, data } = useQuery(USER);
  if (loading || error) return null;

  const checkSupport = () => {
    const { supportedEvents } = data.currentUser;
    console.log(supportedEvents);

    return supportedEvents.find((event) => event.id === props.event.id) && true;
  };

  const supported = checkSupport();

  const onSupport = async () => {
    try {
      const refetchQueries = () => [
        { query: USER },
        { query: SUPPORT_QUERY, variables: { eventId: props.event.id } },
      ];
      if (!supported) {
        await supportEvent({
          variables: {
            userId: data.currentUser.id,
            eventId: props.event.id,
          },
          refetchQueries,
        });
      } else {
        await unsupportEvent({
          variables: {
            userId: data.currentUser.id,
            eventId: props.event.id,
          },
          refetchQueries,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(supported);

  const buttonClass = classnames({ [styles.supported]: supported });
  return (
    <SupportProgress className={props.className} event={props.event}>
      <IconButton
        onClick={onSupport}
        onMouseDown={(e) => e.stopPropagation()}
        variant="outlined"
        className={buttonClass}
      >
        <Icon type="groupAdd" />
      </IconButton>
    </SupportProgress>
  );
};

export default SupportEvent;
