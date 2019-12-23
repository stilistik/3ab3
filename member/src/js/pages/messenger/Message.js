import React from 'react';
import { Transition } from 'react-transition-group';
import classnames from 'classnames';
import { IconButton } from '@material-ui/core';
import { YoutubeVideo, SpotifyPlayer, LinkValidator, Icon } from 'Components';
import Microlink from '@microlink/react';

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

const MessageImage = ({ url }) => {
  return (
    <a href={url} target="_blank">
      <img src={url} width="100%" style={{ borderRadius: 15 }} />
    </a>
  );
};

export const MessageLink = ({ link, handleRemove }) => {
  if (!link) return null;
  const type = link.type;
  return (
    <div className={styles.messageLink}>
      {handleRemove && (
        <IconButton className={styles.messageLinkRemove} onClick={handleRemove}>
          <Icon type="close" />
        </IconButton>
      )}
      {type === 'IMAGE' && <MessageImage url={link.url} />}
      {type === 'YOUTUBE' && <YoutubeVideo url={link.url} />}
      {type === 'SPOTIFY' && <SpotifyPlayer url={link.url} />}
      {type === 'UNKNOWN' && (
        <Microlink
          url={link.url}
          style={{ borderLeft: 'none', borderRight: 'none' }}
        />
      )}
    </div>
  );
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

export const Message = ({
  id,
  text,
  link,
  fromCurrentUser,
  disableAnimations,
}) => {
  const [show, setShow] = React.useState(Boolean(disableAnimations));
  const [validatedLink, setValidatedLink] = React.useState(null);

  React.useEffect(() => {
    if (!link) return;
    LinkValidator.validateLink(link).then((validated) => {
      setValidatedLink(validated);
    });
  }, [link]);

  React.useEffect(() => {
    if (!show) setShow(true);
  }, [id]);

  const cls = classnames(
    { [styles.fromCurrent]: fromCurrentUser },
    { [styles.fromOther]: !fromCurrentUser }
  );

  return (
    <Scale key={id} className={cls} in={show}>
      <div className={styles.container}>
        <div className={styles.message}>
          <MessageLink link={validatedLink} />
          <span>{text}</span>
        </div>
      </div>
    </Scale>
  );
};
