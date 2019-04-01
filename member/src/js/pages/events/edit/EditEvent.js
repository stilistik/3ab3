import React from 'react';
import { UserSelector } from 'Components';

class EditEvent extends React.Component {
  render() {
    return (
      <div style={{ width: '300px', height: '100px', padding: '20px' }}>
        <UserSelector />
      </div>
    );
  }
}

export default EditEvent;
