import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showUploadTracker, setUploadStatus } from 'Redux/actions';
import { validateFile } from './FileValidator';
import { FILES_QUERY } from '../files/FileManager';

export const UploadContext = React.createContext({});

export function withUpload(WrappedComponent) {
  return class UploadConsumer extends React.Component {
    render() {
      return (
        <UploadContext.Consumer>
          {(value) => {
            return <WrappedComponent {...this.props} uploadContext={value} />;
          }}
        </UploadContext.Consumer>
      );
    }
  };
}

const UPLOAD = gql`
  mutation($file: Upload!, $tags: [String!], $workbookUuid: String) {
    upload(file: $file, tags: $tags, workbookUuid: $workbookUuid) {
      uuid
    }
  }
`;

export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const UPLOAD_COMPLETE = 'UPLOAD_COMPLETE';
export const UPLOAD_RUNNING = 'UPLOAD_RUNNING';

const mapStateToProps = (state) => {
  return {
    workbook_uuid: state.search.workbook_uuid,
    uploading: state.file.status.uploading,
    error: state.file.status.error,
    completed: state.file.status.completed,
    show_tracker: state.file.show_tracker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUploadTracker: () => {
      dispatch(showUploadTracker());
    },
    setUploadStatus: (status) => {
      dispatch(setUploadStatus(status));
    },
  };
};

class UploadProvider extends React.Component {
  onChange = (payload) => {
    const items = payload.upload.map((el) => ({
      status: UPLOAD_RUNNING,
      message: 'Uploading...',
      ...el,
    }));
    this.onStart(items);
    items.forEach((obj) => {
      validateFile(obj.file).then((file) => {
        if (file) {
          this.upload({
            variables: {
              file: file,
              workbookUuid: this.props.workbook_uuid,
            },
            refetchQueries: () => [
              {
                query: FILES_QUERY,
                variables: { first: 25 },
              },
            ],
          })
            .then(() => {
              this.onSuccess({
                ...obj,
                status: UPLOAD_COMPLETE,
                message: 'Complete',
              });
            })
            .catch((err) => {
              this.onError({
                ...obj,
                status: UPLOAD_ERROR,
                message: err.message,
              });
            });
        } else {
          this.onError({
            ...obj,
            status: UPLOAD_ERROR,
            message: 'Invalid file format',
          });
        }
      });
    });
  };

  onStart = (items) => {
    if (this.props.show_tracker) {
      const { uploading, completed, error } = this.props;
      const up = [...uploading, ...items];
      this.props.setUploadStatus({
        uploading: up,
        error: error,
        completed: completed,
      });
    } else {
      this.props.showUploadTracker();
      this.props.setUploadStatus({
        uploading: items,
        error: [],
        completed: [],
      });
    }
  };

  onSuccess = (obj) => {
    const { uploading, completed, error } = this.props;
    const up = uploading.filter((el) => el.uuid !== obj.uuid);
    const cp = [obj, ...completed];
    this.props.setUploadStatus({ uploading: up, completed: cp, error });
  };

  onError = (obj) => {
    const { uploading, completed, error } = this.props;
    const up = uploading.filter((el) => el.uuid !== obj.uuid);
    const er = [obj, ...error];
    this.props.setUploadStatus({ uploading: up, error: er, completed });
  };

  render() {
    const { children } = this.props;
    return (
      <Mutation mutation={UPLOAD}>
        {(upload) => {
          this.upload = upload;
          return (
            <UploadContext.Provider value={this}>
              {children}
            </UploadContext.Provider>
          );
        }}
      </Mutation>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProvider);
