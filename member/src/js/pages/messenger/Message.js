import React from 'react';
import classnames from 'classnames';

import styles from './Message.less';

export const MessageGroup = ({ messages }) => {
  return (
    <div className={styles.messageGroup}>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};


export const Message = ({ text, date, fromCurrentUser }) => {
  if (!text) return null;
  
  const cls = classnames(
    { [styles.fromCurrent]: fromCurrentUser },
    { [styles.fromOther]: !fromCurrentUser }
  );

  return (
    <div className={cls}>
      {date && (
        <div className={styles.date}>
          {new Date(date).toLocaleString('de-DE')}
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.message}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
