import React from 'react';
import {
  Message,
  Icon,
  EmojiPicker,
  GiphyPicker,
  LinkValidator,
} from 'Components';
import { IconButton, Input } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ClickAwayListener } from '@material-ui/core';
import { MessageLink } from './Message';

import styles from './CreateMessage.less';

const MUTATION = gql`
  mutation($input: MessageInput) {
    createMessage(input: $input) {
      id
      text
      link
      date
      from {
        id
      }
      chat {
        id
      }
    }
  }
`;

const EmojiPickerContainer = ({ open, handleSelect, handleClose }) => {
  if (!open) return null;
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <EmojiPicker handleSelect={handleSelect} handleClose={handleClose} />
      </div>
    </ClickAwayListener>
  );
};

const GiphyPickerContainer = ({ open, handleSelect, handleClose }) => {
  if (!open) return null;
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <GiphyPicker handleSelect={handleSelect} handleClose={handleClose} />
      </div>
    </ClickAwayListener>
  );
};

const IDLE_TO_UPDATE = 200;

export const CreateMessage = ({
  currentUser,
  selectedChat,
  onCreateMessage,
}) => {
  let timer = React.useRef(null);
  const [link, setLink] = React.useState(null);
  const [picker, setPicker] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [createMessage] = useMutation(MUTATION);

  const onSubmit = async () => {
    if (!value) return;
    try {
      await createMessage({
        variables: {
          input: {
            fromId: currentUser.id,
            chatId: selectedChat.id,
            text: link ? value.replace(link.url, '') : value,
            link: link ? link.url : null,
          },
        },
      });
      setValue('');
      setLink(null);
      onCreateMessage();
    } catch (error) {
      Message.error(error.message);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      LinkValidator.findLinks(value).then((links) => {
        if (!links.length) return;
        const link = links[0];
        if (link) setLink(link);
        else setLink(null);
      });
    }, IDLE_TO_UPDATE);
    setValue(value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const handlePickerClose = () => setPicker(null);

  const handelEmojiSelect = (emoji) => {
    const newValue = value + String.fromCodePoint(emoji.unicode);
    setValue(newValue);
  };

  const handelGifSelect = (gif) => {
    setLink({ type: 'IMAGE', url: gif.image });
    handlePickerClose();
  };

  const handleRemove = () => setLink(null);

  return (
    <React.Fragment>
      <EmojiPickerContainer
        open={picker === 'emoji'}
        handleClose={handlePickerClose}
        handleSelect={handelEmojiSelect}
      />
      <GiphyPickerContainer
        open={picker === 'giphy'}
        handleClose={handlePickerClose}
        handleSelect={handelGifSelect}
      />
      <MessageLink link={link} handleRemove={handleRemove} />
      <div className={styles.form}>
        <IconButton
          onClick={() => setPicker('giphy')}
          className={styles.iconBtn}
        >
          <Icon type="gif" className={styles.gifIcon} />
        </IconButton>
        <IconButton onClick={() => setPicker('emoji')}>
          <Icon type="mood" />
        </IconButton>
        <Input
          placeholder="Type a message"
          value={value}
          onChange={onChange}
          className={styles.input}
          multiline
          disableUnderline
          onKeyDown={onKeyDown}
        />
        <IconButton type="submit" onClick={onSubmit}>
          <Icon type="send" />
        </IconButton>
      </div>
    </React.Fragment>
  );
};

CreateMessage.defaultProps = {
  onCreateMessage: () => {},
};
