import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import LinkValidator from './LinkValidator';
import {
  Card,
  CardContent,
  Button,
  Input,
  makeStyles,
} from '@material-ui/core';
import { Icon, UserAvatar, ImageContainer } from 'Components';
import { PostLink } from './Post';
import ImageInput from './ImageInput';
import { useTranslation } from 'react-i18next';

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

const useStyles = makeStyles((theme) => ({
  content: { padding: '15px 10px !important' },
  form: { display: 'flex' },
  avatar: { marginRight: '15px' },
  preview: {
    width: '150px',
    height: '150px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: '10px',
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    background: theme.palette.action.default,
    padding: '5px 10px',
    flexGrow: '100',
    marginRight: '5px',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  inputFocused: {
    background: theme.palette.action.hover,
  },
  submit: {
    width: '100%',
    marginTop: '10px',
  },
}));

const CreatePostForm = (props) => {
  let timer = React.useRef(null);
  const [text, setText] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [src, setSrc] = React.useState(null);
  const [link, setLink] = React.useState(null);
  const { t } = useTranslation();
  const styles = useStyles();

  const { loading, error, data } = useQuery(QUERY);
  if (loading || error) return null;
  const user = data.currentUser;

  const onChange = (e) => {
    const value = e.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      LinkValidator.findLinks(value).then((links) => {
        const link = links[0];
        if (link) setLink(link);
        else setLink(null);
      });
    }, IDLE_TO_UPDATE);
    setText(value);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setSrc(e.target.result);
    reader.readAsDataURL(file);
    setImage(file);
  };

  const onSubmit = async () => {
    if (text.length === 0 && !file && !link) return;
    await props.onSubmit({
      userId: user.id,
      text: link ? text.replace(link.url, '') : text,
      image: image,
      link: link ? link.url : null,
    });
    setText('');
    setImage(null);
    setSrc(null);
    setLink(null);
  };

  return (
    <Card>
      <CardContent className={styles.content}>
        <div className={styles.form}>
          <UserAvatar user={user} className={styles.avatar} />
          <Input
            value={text}
            onChange={onChange}
            multiline
            placeholder={t('Write something...')}
            className={styles.input}
            classes={{
              focused: styles.inputFocused,
            }}
            disableUnderline
          />
          <ImageInput onChange={onImageChange} />
        </div>
        {src && (
          <ImageContainer image={src} classes={{ root: styles.preview }} />
        )}
        <PostLink link={link} />
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          className={styles.submit}
        >
          {t('Post')} <Icon type="send" style={{ marginLeft: '10px' }} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
