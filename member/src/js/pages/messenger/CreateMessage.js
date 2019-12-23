import React from 'react';
import { Message, Icon, EmojiPicker, GiphyPicker } from 'Components';
import { IconButton, Input } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ClickAwayListener } from '@material-ui/core';

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

export const CreateMessage = ({
  currentUser,
  selectedChat,
  onCreateMessage,
}) => {
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
            text: value,
          },
        },
      });
      setValue('');
      onCreateMessage();
    } catch (error) {
      Message.error(error.message);
    }
  };

  const onChange = (e) => setValue(e.target.value);
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
    console.log(gif);
  };

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
