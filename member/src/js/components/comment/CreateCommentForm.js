import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Input, ClickAwayListener } from '@material-ui/core';
import {
  UserAvatar,
  EmojiPicker,
  GiphyPicker,
  Icon,
  LinkValidator,
} from 'Components';
import { MessageLink } from 'Pages/messenger/Message';

import styles from './CreateCommentForm.less';
import { useTranslation } from 'react-i18next';

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
        <GiphyPicker
          handleSelect={handleSelect}
          handleClose={handleClose}
          colCount={2}
        />
      </div>
    </ClickAwayListener>
  );
};

const QUERY = gql`
  query {
    currentUser {
      id
      name
      avatar
    }
  }
`;

const IDLE_TO_UPDATE = 200;

const CreateCommentForm = (props) => {
  let timer = React.useRef(null);
  const { t } = useTranslation();
  const [link, setLink] = React.useState(null);
  const [picker, setPicker] = React.useState(null);
  const [value, setValue] = React.useState('');
  const { loading, error, data } = useQuery(QUERY);

  if (loading || error) return null;

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
      submit();
    }
  };

  const submit = () => {
    if (!value && !link) return;
    props.onSubmit({
      id: props.id,
      text: link ? value.replace(link.url, '') : value,
      link: link ? link.url : null,
    });
    setValue('');
    setLink(null);
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
      <div className={styles.container}>
        <UserAvatar user={data.currentUser} className={styles.avatar} />
        <Input
          className={styles.input}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
          multiline
          disableUnderline
          autoFocus={true}
          placeholder={t('Comment')}
          endAdornment={
            <div className={styles.adornment}>
              <Icon
                type="gif"
                onClick={() => setPicker('giphy')}
                className={styles.gifIcon}
              />
              <Icon
                type="mood"
                onClick={() => setPicker('emoji')}
                className={styles.moodIcon}
              />
            </div>
          }
        />
      </div>
    </React.Fragment>
  );
};

export default CreateCommentForm;
