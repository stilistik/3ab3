import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import LinkValidator from './LinkValidator';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';
import { Icon, UserAvatar, ImageContainer } from 'Components';
import { PostImage, PostLink } from './Post';
import ImageInput from './ImageInput';

import styles from './CreatePostForm.css';

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

const CreatePostForm = (props) => {
  let timer = React.useRef(null);
  const [text, setText] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [src, setSrc] = React.useState(null);
  const [link, setLink] = React.useState(null);

  const { loading, error, data } = useQuery(QUERY);
  if (loading || error) return null;
  const user = data.currentUser;

  const onChange = (e) => {
    const value = e.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const link = LinkValidator.findLinks(value)[0];
      if (link) setLink(link);
      else setLink(null);
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
          <TextField
            value={text}
            onChange={onChange}
            multiline
            placeholder="Write something..."
            style={{ width: '100%' }}
          />
          <ImageInput onChange={onImageChange} />
        </div>
        {src && (
          <ImageContainer image={src} classes={{ root: styles.preview }} />
        )}
        <PostLink link={link} />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          style={{ width: '100%' }}
          onClick={onSubmit}
        >
          Post <Icon type="send" style={{ marginLeft: '10px' }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePostForm;
