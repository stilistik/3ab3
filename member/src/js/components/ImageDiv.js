import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Icon } from 'Components';

export class ImageDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
    };
  }

  componentDidMount = () => {
    const url = global.API_URL + this.props.image;
    const img = new Image();
    img.onload = this.onLoad;
    img.onerror = () => this.setState({ error: true });
    img.src = url;
  };

  onLoad = () => {
    this.image.style.backgroundImage = `url(${global.API_URL +
      this.props.image})`;
    this.setState({ loading: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} ref={(ref) => (this.image = ref)}>
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

ImageDiv.defaultProps = {
  classes: {
    root: {},
    indicator: {},
    progress: {},
    icon: {},
  },
};
