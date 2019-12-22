import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import styles from './Message.less';

const duration = 200;

const defaultStyle = {
  transition: `transform ${duration}ms ease`,
  transform: 'scale(0)',
};

const transitionStyles = {
  entering: { transform: 'scale(0)' },
  entered: { transform: 'scale(1)' },
  exiting: { transform: 'scale(1)' },
  exited: { transform: 'scale(0)' },
};

const Scale = ({ in: inProp, children, ...rest }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div
        {...rest}
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

export const MessageGroup = ({ messages, groupDate, ...rest }) => {
  return (
    <div className={styles.messageGroup}>
      {groupDate && (
        <div className={styles.date}>
          {new Date(groupDate).toLocaleString('de-DE')}
        </div>
      )}
      {messages.map((message) => (
        <Message key={message.id} {...message} {...rest} />
      ))}
    </div>
  );
};

export const Message = ({ id, text, fromCurrentUser, disableAnimations }) => {
  const [show, setShow] = React.useState(Boolean(disableAnimations));

  React.useEffect(() => {
    if (!show) setShow(true);
  }, [id]);

  if (!text) return null;

  const cls = classnames(
    { [styles.fromCurrent]: fromCurrentUser },
    { [styles.fromOther]: !fromCurrentUser }
  );

  return (
    <Scale key={id} className={cls} in={show}>
      <div className={styles.container}>
        <div className={styles.message}>
          <span>{text}</span>
        </div>
      </div>
    </Scale>
  );
};
