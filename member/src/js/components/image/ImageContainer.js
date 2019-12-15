import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Icon } from 'Components';
import classnames from 'classnames';

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
    };
  }

  componentDidMount = () => {
    const img = new Image();
    img.onload = this.onLoad;
    img.onerror = this.onError;
    img.src = this.props.image;
  };

  onLoad = () => {
    this.image.style.backgroundImage = `url(${this.props.image})`;
    this.setState({ loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { className, classes, style } = this.props;
    const rootClass = classnames(className, classes.root);
    return (
      <div
        className={rootClass}
        style={style}
        ref={(ref) => (this.image = ref)}
      >
        {this.state.loading ? (
          <div className={classes.indicator}>
            <CircularProgress size={60} className={classes.progress} />
          </div>
        ) : null}
        {this.state.error ? (
          <div className={classes.indicator}>
            <Icon type="camera" className={classes.icon} />
          </div>
        ) : null}
      </div>
    );
  }
}

ImageContainer.defaultProps = {
  classes: {
    root: null,
    indicator: null,
    progress: null,
    icon: null,
  },
};

export default ImageContainer;
