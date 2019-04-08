import React from 'react';
import { Paper } from '@material-ui/core';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import TodoTemplate from './TodoTemplate';

import styles from './TemplateSelector.css';

const TEMPLATES = gql`
  query {
    todoTemplates {
      id
      text
      offsetDays
    }
  }
`;

class TemplateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  onClick = (templateId) => {
    let { selected } = this.state;
    const found = selected.find((el) => el === templateId);
    if (found) selected.splice(selected.indexOf(found), 1);
    else selected.push(templateId);
    this.setState({ selected });
  };

  render() {
    const { templates } = this.props;
    if (!templates) return null;
    return (
      <div>
        {templates.map((template) => {
          const { selected } = this.state;
          const isSelected = selected.find((el) => el === template.id);
          return (
            <TodoTemplate
              key={template.id}
              template={template}
              onClick={this.onClick}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    );
  }
}

export default graphql(TEMPLATES, {
  props: ({ data }) => ({ templates: data.todoTemplates }),
})(TemplateSelector);
