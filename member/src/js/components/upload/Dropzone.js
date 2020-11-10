import React from 'react';
import uuid from 'uuid/v4';
import compose from 'lodash/flowRight';
import { connect } from 'react-redux';
import { Icon } from '../icon';
import classnames from 'classnames';
import UploadConfirm from './UploadConfirm';
import { withUpload } from './UploadContext';

import styles from './Dropzone.less';

const mapStateToProps = (state) => {
  return {
    tags: state.search.tags,
  };
};

class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dragging: false, visible: false, payload: null };
    this.handlers = {
      dragover: this.onDragOver,
      dragenter: this.onDragEnter,
      dragleave: this.onDragLeave,
      dragend: this.onDragEnd,
      drop: this.onDrop,
    };
    this.position = { x: 0, y: 0 };
  }

  componentDidMount = () => {
    for (let h in this.handlers) {
      this.dropzone.addEventListener(h, this.handlers[h], false);
    }
  };

  componentWillUnmount = () => {
    for (let h in this.handlers) {
      this.dropzone.removeEventListener(h, this.handlers[h], false);
    }
  };

  startDrag = () => {
    this.setState({ dragging: true });
  };

  stopDrag = () => {
    this.setState({ dragging: false });
  };

  onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      if (this.timer) clearTimeout(this.timer);
    }, 1);
    this.startDrag();
  };

  onDragOver = (e) => {
    this.position = { x: e.x, y: e.y };
    e.preventDefault();
    e.stopPropagation();
    if (this.timer) clearTimeout(this.timer);
  };

  onDragEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.timer = setTimeout(this.stopDrag, 100);
  };

  onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.timer = setTimeout(this.stopDrag, 100);
  };

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const upload = Object.values(e.dataTransfer.files).map((file, idx) => {
      return {
        index: idx,
        uuid: uuid(),
        file: file,
      };
    });
    if (!upload.length > 0) {
      // failed datatransfers
      this.setState({ visible: false, dragging: false });
    } else {
      const payload = {
        upload: upload,
        workbook: this.getCurrentWorkbook(),
      };
      this.setState({ visible: true, dragging: false, payload: payload });
    }
  };

  handleOk = () => {
    this.props.uploadContext.onChange(this.state.payload);
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ payload: null, visible: false });
  };

  getCurrentWorkbook = () => {
    if (!this.props.tags) return null;
    return this.props.tags.find((tag) => {
      return tag.startsWith('@');
    });
  };

  render() {
    const cls = classnames(styles.dragover, {
      [styles.visible]: this.state.dragging,
      [styles.invisible]: !this.state.dragging,
    });
    return (
      <div ref={(ref) => (this.dropzone = ref)} className={styles.dropzone}>
        <UploadConfirm
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          payload={this.state.payload}
        />
        <div className={cls}>
          <div className={styles.inner}>
            <div className={styles.icon}>
              <Icon type="upload" />
            </div>
            <h2>Drop files here to upload</h2>
            <p>The data will be added to your current workbook</p>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Dropzone.defaultProps = {
  dragOverClass: styles.dragover,
  onChange: () => {},
};

export default compose(withUpload, connect(mapStateToProps))(Dropzone);
