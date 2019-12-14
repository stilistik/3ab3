import React from 'react';
import { Tooltip } from '../tooltip';
import uuid from 'uuid/v4';
import classnames from 'classnames';
import { Message } from '../feedback';
import { withDragContext } from './DragContext';

import styles from './DragContainer.less';

export class DragContainer extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();

    this.state = {
      draggingOver: false,
      dragging: false,
    };
  }

  componentDidMount = () => {
    // register this container with the drag context
    if (this.props.dragContext)
      this.props.dragContext.registerContainer(this, this.id);
  };

  componentWillUnmount = () => {
    // register this container with the drag context
    if (this.props.dragContext)
      this.props.dragContext.unregisterContainer(this, this.id);
  };

  /**
   * Called from DragContext when a drag movement has started
   */
  onDragStart = () => this.setState({ dragging: true });

  /**
   * Called from DragContext when a drag movement has ended
   */
  onDragEnd = () => this.setState({ dragging: false, draggingOver: false });

  /**
   * Called from DragContext when a draggable is dropped into this
   * container
   * @param {Object} draggables: An object containing references to
   * all the dropped draggables.
   */
  onDrop = (draggables) => {
    this.setState({ draggingOver: false });
    if (this.props.forbidden) return;
    Message.success(
      `Dropped ${Object.keys(draggables).length} object(s) into '${
        this.props.name
      }'!`
    );
    this.props.onDrop(draggables);
  };

  onMouseEnter = () => {
    if (this.state.dragging) {
      this.setState({ draggingOver: true });
      this.props.dragContext.onDragOver(this);
    }
  };

  onMouseLeave = () => {
    if (this.state.dragging) {
      this.setState({ draggingOver: false });
      this.props.dragContext.onDragOver(null);
    }
  };

  /**
   * Helper method to get the bounds of this container
   * @returns {Object}: DOM Bounding rectangle
   */
  getBoundingClientRect = () => {
    return this.container.getBoundingClientRect();
  };

  render() {
    const { draggingOver, dragging } = this.state;
    const { dragOverClass, forbiddenClass, tooltip, forbidden } = this.props;
    const cls = classnames(styles.container, {
      [dragOverClass]: draggingOver,
      [forbiddenClass]: dragging && forbidden,
    });
    return (
      <Tooltip title={draggingOver ? tooltip : null} placement="top">
        <div
          ref={(ref) => (this.container = ref)}
          className={cls}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {this.props.children}
        </div>
      </Tooltip>
    );
  }
}

DragContainer.defaultProps = {
  dragOverClass: styles.dragover,
  forbiddenClass: styles.forbidden,
  forbidden: false,
  tooltip: '',
  onDrop: () => {},
  group: 'default',
};

export default withDragContext(DragContainer);
