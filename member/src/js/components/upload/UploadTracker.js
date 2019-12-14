import React from 'react';
import { connect } from 'react-redux';
import { IconButton, LinearProgress } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Icon } from '../icon';
import { UPLOAD_ERROR, UPLOAD_COMPLETE, UPLOAD_RUNNING } from './UploadContext';
import { hideUploadTracker } from 'Redux/actions';

import styles from './UploadTracker.less';

const TrackerDisplayBody = ({ numbers, allUploads, minimized }) => {
  if (minimized) return null;
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={numbers.percent}
        style={{ marginBottom: 10 }}
      />
      <div className={styles.list}>
        {allUploads.map((obj) => {
          switch (obj.status) {
            case UPLOAD_COMPLETE: {
              return (
                <div key={obj.uuid} className={styles.file}>
                  <Icon type="checkCircle" style={{ marginRight: '10px' }} />
                  {obj.file.name}: {obj.message}
                </div>
              );
            }
            case UPLOAD_ERROR: {
              return (
                <div
                  key={obj.uuid}
                  className={styles.file}
                  style={{ color: 'red' }}
                >
                  <Icon type="cancel" style={{ marginRight: '10px' }} />
                  {obj.file.name}: {obj.message}
                </div>
              );
            }
            case UPLOAD_RUNNING: {
              return (
                <div key={obj.uuid} className={styles.file}>
                  <Icon type="loading" style={{ marginRight: '10px' }} />
                  {obj.file.name}: {obj.message}
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

const TrackerDisplayHeader = ({ numbers, onHide, onToggle, minimized }) => {
  const cls = minimized
    ? styles['toggle-minimized']
    : styles['toggle-maximized'];
  return (
    <div className={styles.header}>
      {minimized ? (
        <div className={styles.progressMinimized}>
          <LinearProgress
            variant="determinate"
            value={numbers.percent}
            style={{ marginRight: 5 }}
          />
        </div>
      ) : (
        <h3 style={{ marginBottom: '0px' }}>
          Uploading: {numbers.processed} / {numbers.total}
        </h3>
      )}
      <div className={styles.btn}>
        <IconButton onClick={onHide}>
          <Icon type="close" />
        </IconButton>
        <IconButton onClick={onToggle}>
          <Icon className={cls} type="down" />
        </IconButton>
      </div>
    </div>
  );
};

class TrackerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minimized: false };
  }

  onToggle = () => this.setState({ minimized: !this.state.minimized });

  render() {
    const { uploading, error, completed, onHide } = this.props;
    const allUploads = uploading
      .concat(completed)
      .concat(error)
      .sort((a, b) => a.index > b.index);

    const total = allUploads.length;
    const processed = error.length + completed.length;
    const numbers = {
      total: total,
      processed: processed,
      percent: Math.ceil((processed / total) * 100),
    };

    return (
      <div className={styles.tracker}>
        <TrackerDisplayHeader
          numbers={numbers}
          onHide={onHide}
          onToggle={this.onToggle}
          minimized={this.state.minimized}
        />
        <TrackerDisplayBody
          numbers={numbers}
          allUploads={allUploads}
          minimized={this.state.minimized}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.file.show_tracker,
    uploading: state.file.status.uploading,
    error: state.file.status.error,
    completed: state.file.status.completed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideUploadTracker());
    },
  };
};

class UploadTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minimized: false };
  }

  componentDidUpdate = (prevProps) => {
    const { uploading } = this.props;
    if (uploading.length !== prevProps.uploading.length) {
      if (uploading.length <= 0 && this.props.timeout > 0) {
        setTimeout(() => {
          this.props.onHide();
        }, this.props.timeout);
      }
    }
  };

  onToggle = () => {
    this.setState({ minimized: !this.state.minimized });
  };

  render() {
    const { show, ...rest } = this.props;
    return (
      <TransitionGroup>
        {show ? (
          <CSSTransition
            classNames={{
              enter: styles['tracker-enter'],
              enterActive: styles['tracker-enter-active'],
              exit: styles['tracker-exit'],
              exitActive: styles['tracker-exit-active'],
            }}
            timeout={{ enter: 300, exit: 300 }}
          >
            <TrackerDisplay onToggle={this.onToggle} {...rest} />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadTracker);
