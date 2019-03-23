import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventIcon from '@material-ui/icons/Event';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import PhotoIcon from '@material-ui/icons/Photo';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import AddCommentIcon from '@material-ui/icons/AddComment';
import CommentIcon from '@material-ui/icons/ModeComment';
import SendIcon from '@material-ui/icons/Send';
import LikeIcon from '@material-ui/icons/ThumbUp';

const icons = {
  mail: MailIcon,
  home: HomeIcon,
  dashboard: DashboardIcon,
  assessment: AssessmentIcon,
  event: EventIcon,
  payment: PaymentIcon,
  upload: CloudUploadIcon,
  error: ErrorIcon,
  success: CheckCircleIcon,
  info: InfoIcon,
  close: CloseIcon,
  drinks: LocalBarIcon,
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  group: GroupIcon,
  photo: PhotoIcon,
  camera: CameraIcon,
  addComment: AddCommentIcon,
  comment: CommentIcon,
  send: SendIcon,
  like: LikeIcon,
};

export class Icon extends React.Component {
  render() {
    const C = icons[this.props.type];
    return <C {...this.props} />;
  }
}
