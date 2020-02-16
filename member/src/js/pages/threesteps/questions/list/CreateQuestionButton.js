import React from 'react';
import { CreateButton } from 'Components';
import { requestRoute } from 'History';

class CreateQuestionButton extends React.Component {
  onClick = () => {
    requestRoute('/questions/create');
  };

  render() {
    return <CreateButton onClick={this.onClick} />;
  }
}

export default CreateQuestionButton;
