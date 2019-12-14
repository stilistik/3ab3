import React from 'react';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import { withDragContext } from './DragContext';

import styles from './Draggable.less';

export class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
    this.mousedown = false;
    this.timeout = null;
    this.state = { dragging: false };
  }

  componentDidMount = () => {
    this.props.dragContext.registerDraggable(this, this.id);
  };

  componentWillUnmount = () => {
    this.props.dragContext.unregisterDraggable(this, this.id);
  };

  /**
   * EventHandler for mouse down events on this Draggable.
   */
  onMouseDown = (e) => {
    if (this.props.disabled || e.button !== 0) return;
    this.mousedown = true;

    if (e.shiftKey || e.ctrlKey || e.cmdKey) {
      this.props.dragContext.selectDraggable(this);
      e.stopPropagation();
      return;
    }

    const isSelected = this.props.dragContext.selected[this.id] && true;
    if (isSelected) {
      // no drag onset delay if draggable is already selected
      this.props.dragContext.onDragStart(this);
    } else {
      // start drag initiation timer
      this.timeout = setTimeout(() => {
        if (this.mousedown) this.props.dragContext.onDragStart(this);
      }, this.props.dragContext.props.dragTimeout);
    }
  };

  /**
   * EventHandler for mouse move envents on this Draggable.
   */
  onMouseMove = () => {
    // clear any drag initiation timers
    clearTimeout(this.timeout);
  };

  /**
   * EventHandler for mouse up events on this Draggable.
   */
  onMouseUp = () => {
    // clear any drag initiation timers
    clearTimeout(this.timeout);
  };

  /**
   * Called from DragContext on drag start if dragging is initiated
   * on this Draggable
   */
  onDragStart = () => {
    this.setState({ dragging: true });
  };

  /**
   * Called from DragContext on drag end if dragging was initiated on
   * this Draggable.
   */
  onDragEnd = () => {
    this.setState({ dragging: false });
  };

  getBoundingClientRect = () => {
    return this.element.getBoundingClientRect();
  };

  update = () => this.forceUpdate();

  render() {
    const { className } = this.props;
    const cls = classnames(styles.draggable, className, {
      [styles.dragging]: this.state.dragging,
    });
    const isSelected = this.props.dragContext.selected[this.id] && true;
    return (
      <div
        ref={(ref) => (this.element = ref)}
        className={cls}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      >
        {this.props.children}
        {isSelected ? (
          <div className={this.props.selectedClass}>
            <div />
          </div>
        ) : null}
      </div>
    );
  }
}

Draggable.defaultProps = {
  selectedClass: styles.selected,
  group: 'default',
  getPayload: () => null,
};

export default withDragContext(Draggable);
