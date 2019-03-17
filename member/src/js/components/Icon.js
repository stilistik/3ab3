import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventIcon from '@material-ui/icons/Event';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const icons = {
  mail: MailIcon,
  home: HomeIcon,
  dashboard: DashboardIcon,
  assessment: AssessmentIcon,
  event: EventIcon,
  payment: PaymentIcon,
  upload: CloudUploadIcon,
};

export class Icon extends React.Component {
  render() {
    const C = icons[this.props.type];
    return <C {...this.props} />;
  }
}
