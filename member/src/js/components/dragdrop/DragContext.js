import React from 'react';
import Ghost from './Ghost';
import DragSelect from './DragSelect';

export const DragContext = React.createContext({});

export function withDragContext(WrappedComponent) {
  return class DragConsumer extends React.Component {
    render() {
      return (
        <DragContext.Consumer>
          {(value) => {
            const dragContext = Object.keys(value).length > 0 ? value : null;
            if (dragContext) {
              return (
                <WrappedComponent {...this.props} dragContext={dragContext} />
              );
            } else {
              return (
                <div style={{ width: '100%', height: '100%' }}>
                  {this.props.children}
                </div>
              );
            }
          }}
        </DragContext.Consumer>
      );
    }
  };
}

export class DragProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggable: null,
      select: null,
      position: { x: 0, y: 0 },
      transition: 'drag',
    };

    // consts
    this.DELTA_THRESH = 12; // delta that has to be moved in x or y to trigger selectStart

    // refs
    this.containers = {};
    this.draggables = {};
    this.listeners = {};

    // internals
    this.draggable = null; // currently dragged draggable
    this.selected = {}; // currently selected draggables to drag along
    this.draggingOver = null; // container currently dragging over
    this.mouseDown = false; // boolean indicating if left mouse button is pressed
    this.dragging = false; // boolean indicating if currently dragging a draggable
    this.position = { x: 0, y: 0 }; // last mouse down position
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);

    // prevent default image drag behavior in firefox
    document.addEventListener('dragstart', (e) => e.preventDefault());
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('dragstart', (e) => e.preventDefault());
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const prevDraggableExists = prevState.draggable && true;
    const prevSelectExists = prevState.select && true;
    const thisDraggableExists = this.state.draggable && true;
    const thisSelectExists = this.state.select && true;

    if (
      prevDraggableExists !== thisDraggableExists ||
      prevSelectExists !== thisSelectExists
    ) {
      for (let listener of Object.values(this.listeners))
        if (listener.update) await listener.update();
    }
  };

  /**
   * Called by draggable HOC when there is a mouse down event on a draggable
   */
  onMouseDown = (e) => {
    if (e.button === 0) {
      this.position = { x: e.x, y: e.y };
      this.mouseDown = true;
    }
  };

  /**
   * EventHandler for mouse up events on the document
   * @param {Event} e: the mouse up event
   */
  onMouseUp = (e) => {
    this.mouseDown = false;
    if (this.dragging) this.onDragEnd(e);
    else if (this.state.select) this.onSelectEnd(e);
    else if (!e.shiftKey && !e.ctrlKey && !e.cmdKey) this.deselectAll();
  };

  /**
   * EventHandler for mouse move events on the document
   * @param {Event} e: the mouse move event
   */
  onMouseMove = (e) => {
    this.setState({ position: { x: e.x, y: e.y } });
    if (this.mouseDown && this.dragging) {
      this.onDragMove(e);
    } else if (
      this.mouseDown &&
      !this.dragging &&
      !this.state.select &&
      this.exceedsDelta(e)
    ) {
      this.onSelectStart(e);
    } else if (this.mouseDown && !this.dragging && this.state.select) {
      this.onSelectMove(e);
    }
  };

  exceedsDelta = (e) => {
    return (
      Math.abs(e.x - this.position.x) > this.DELTA_THRESH ||
      Math.abs(e.y - this.position.y) > this.DELTA_THRESH
    );
  };

  /**
   * This selects a draggable if it is not already selected
   * @param {Draggable} draggable: the draggable instance that was clicked
   */
  selectDraggable = (draggable) => {
    const { selected } = this;
    if (!selected[draggable.id]) {
      selected[draggable.id] = draggable;
      draggable.update();
    }
  };

  /**
   * This deselects a draggable if it is selected
   * @param {Draggable} draggable: the draggable instance that was clicked
   */
  deselectDraggable = (draggable) => {
    const { selected } = this;
    if (selected[draggable.id]) {
      delete selected[draggable.id];
      draggable.update();
    }
  };

  /**
   * EventHandler for synthetic drag start events (not a real DOM event).
   * Called from the draggable that registers being dragged.
   * @param {Draggable} draggable: The draggable that has registered a drag
   * motion.
   */
  onDragStart = async (draggable) => {
    // do not allow drag start if select is in progrss
    if (this.state.select) return;

    // set the internal state
    this.dragging = true;
    this.disableUserSelect();
    await this.setState({ draggable, transition: 'drag' });

    // notify draggables and containers
    draggable.onDragStart();
    for (let d of Object.values(this.selected)) d.onDragStart();
    for (let c of Object.values(this.containers)) c.onDragStart();
  };

  /**
   * EventHandler for synthetic drag move events (not a real DOM event)
   */
  onDragMove = () => {};

  /**
   * EventHandler for synthetic drag end events (not a real DOM event)
   */
  onDragEnd = () => {
    this.enableUserSelect();
    this.state.draggable.onDragEnd();
    for (let d of Object.values(this.selected)) d.onDragEnd();

    if (this.draggingOver) {
      // currently dragging over a container
      if (
        this.draggingOver.props.group === this.state.draggable.props.group &&
        !this.draggingOver.props.forbidden
      )
        this.handleDrop();
      else this.handleForbidden();
    } else {
      // currently not dragging over a valid container
      this.handleLose();
    }

    // handle container state
    this.dragging = false;
    for (let c of Object.values(this.containers)) c.onDragEnd();
    this.setState({ draggable: null });
  };

  /**
   * EventHandler for synthetic select start events (not a real DOM event).
   * Called when the user starts selecting a region in the drag context using
   * a click and drag motion.
   */
  onSelectStart = () => {
    this.disableUserSelect();
    const select = this.createSelectBbox(this.position);
    this.setState({ select });
  };

  /**
   * EventHandler for synthetic select move events (not a real DOM event).
   * Called when the user changes an existing selection rectangle
   * @param {Event} e: The original mouse move DOM event
   */
  onSelectMove = (e) => {
    const select = this.updateSelectBbox(e);
    this.setState({ select });
    this.selectDraggables(e);
  };

  /**
   * EventHandler for synthetic select end events (not a real DOM event).
   * Called when the user releases a selection rectangle
   */
  onSelectEnd = () => {
    this.enableUserSelect();
    this.setState({ select: null });
  };

  /**
   * Initiates a selection bounding box, if none currently exists.
   * The bounding box has an area of 0, all four corners coincide in the
   * event origin position.
   * @param {Event} e: The original mouse move DOM event
   * @returns {Object}: The selection bounding box
   */
  createSelectBbox = (e) => {
    let initX, initY, x, y, top, left, right, bottom, width, height;
    initX = x = left = right = e.x;
    initY = y = top = bottom = e.y;
    width = height = 0;
    return { initX, initY, x, y, left, top, right, bottom, width, height };
  };

  /**
   * Updates an existing selection bounding box. If the user drags to a position
   * left or above of the se;ect start position (initX, initY), the dimensions
   * of the selection box have to be adapted to cope with negative width and height
   * @param {Event} e: The original mouse move DOM event containing the current drag
   * position
   * @returns {Object}: The updated selection bounding box
   */
  updateSelectBbox = (e) => {
    const old = this.state.select;
    let initX, initY, x, y, top, left, right, bottom, width, height;

    initX = old.initX;
    initY = old.initY;

    const w = e.x - initX;
    const h = e.y - initY;

    // negative width
    if (w < 0) {
      x = left = e.x;
      right = initX;
    } else {
      x = left = initX;
      right = initX + w;
    }

    // negative height
    if (h < 0) {
      y = top = e.y;
      bottom = initY;
    } else {
      y = top = initY;
      bottom = initY + h;
    }

    width = Math.abs(w);
    height = Math.abs(h);

    return { initX, initY, x, y, left, top, right, bottom, width, height };
  };

  /**
   * Disables user select and pointer events for the entire document.
   * Called when a drag or select motion is in progress.
   */
  disableUserSelect = () => {
    document.body.style.MozUserSelect = 'none';
    document.body.style.userSelect = 'none';
  };

  /**
   * Re-enbles user select and pointer events after a drag or select
   * motion has ended.
   */
  enableUserSelect = () => {
    document.body.style.MozUserSelect = 'auto';
    document.body.style.userSelect = 'auto';
  };

  /**
   * Collides all draggables against the current selection box to
   * determine if they should be selected or not
   * @param {Event} e: The mouse move DOM event. Used to detect if the
   * user holds shift or ctrl keys.
   */
  selectDraggables = async (e) => {
    const { select } = this.state;
    for (let draggable of Object.values(this.draggables)) {
      if (this.intersectsDraggable(draggable, select)) {
        // draggable intersects selection
        this.selectDraggable(draggable);
      } else if (!e.shiftKey && !e.ctrlKey) {
        // draggable not intersecting and user does not hold shift or ctrl
        // deselect the draggable
        this.deselectDraggable(draggable);
      }
    }
  };

  /**
   * Checks if a draggable intersects a selection area
   * @param {Draggable} draggable: The draggable to test
   * @param {Object} select: The selection area AABB
   * @returns {Boolean}: true if the draggable intersects the area, false
   * otherwise.
   */
  intersectsDraggable = (draggable, select) => {
    const bbox = draggable.getBoundingClientRect();
    const sbox = {
      left: select.x,
      top: select.y,
      right: select.x + select.width,
      bottom: select.y + select.height,
    };
    return !(
      bbox.left > sbox.right ||
      bbox.right < sbox.left ||
      bbox.top > sbox.bottom ||
      bbox.bottom < sbox.top
    );
  };

  /**
   * Drag end handler for if the draggable was located over a container component
   * of the same group when the drag end event was fired.
   */
  handleDrop = () => {
    this.setState({ transition: 'drop' });
    const { draggable } = this.state;
    const toDrop = {
      [draggable.id]: draggable,
      ...this.selected,
    };
    this.draggingOver.onDrop(toDrop);
    this.draggingOver = null;
  };

  /**
   * Drag end handler for if the draggable was not located over a container component
   * when the drag end event was fired.
   */
  handleLose = () => {
    this.setState({ transition: 'lose' });
  };

  /**
   * Drag end handler for if the draggable was located over a container component
   * that does not belong to the same group as the draggble. The drop is forbidden
   * in this case.
   */
  handleForbidden = () => {
    this.setState({ transition: 'lose' });
    this.draggingOver.onDragEnd();
    this.draggingOver = null;
  };

  /**
   * Called from DragContainers if a drag movement enters the container boundaries
   * @param {DragContainer} container: The currently dragged over container
   */
  onDragOver = (container) => {
    this.draggingOver = container;
  };

  /**
   * Computes the current count of dragged draggables to show in the Ghost
   * component.
   * @returns {Number}: The count of currently dragged draggables
   */
  computeCount = () => {
    const { draggable } = this.state;
    if (draggable && this.selected[draggable.id]) {
      // the currently dragged draggable is also selected at the same time
      return Object.keys(this.selected).length;
    } else {
      // the currently dragged draggable is not selectd, add 1 to count
      return Object.keys(this.selected).length + 1;
    }
  };

  /**
   * Selects all currently registered draggables.
   */
  selectAll = () => {
    this.selected = Object.assign({}, this.draggables);
    for (let draggable of Object.values(this.selected)) draggable.update();
  };

  /**
   * Deselects all currently registered draggables.
   */
  deselectAll = () => {
    this.selected = {};
    for (let draggable of Object.values(this.draggables)) draggable.update();
  };

  /**
   * Registers a DragContainer instance with this DragContext
   * @param {Object} ref: A reference to the DragContainer
   * @param {String} id: A unique ID for the DragContainer
   */
  registerContainer = (ref, id) => {
    if (!this.containers[id]) this.containers[id] = ref;
  };

  /**
   * Unregisters a DragContainer instance from this DragContext
   * @param {Object} ref: A reference to the DragContainer
   * @param {String} id: A unique ID for the DragContainer
   */
  unregisterContainer = (ref, id) => {
    if (this.containers[id]) delete this.containers[id];
  };

  /**
   * Registers a Draggable instance with this DragContext
   * @param {Object} ref: A reference to the Draggable
   * @param {String} id: A unique ID for the Draggable
   */
  registerDraggable = (ref, id) => {
    if (!this.draggables[id]) this.draggables[id] = ref;
  };

  /**
   * Unregisters a Draggable instance from this DragContext. Also
   * deselects the Draggable if it was previously selected.
   * @param {Object} ref: A reference to the Draggable
   * @param {String} id: A unique ID for the Draggable
   */
  unregisterDraggable = (ref, id) => {
    if (this.selected[id]) delete this.selected[id];
    if (this.draggables[id]) delete this.draggables[id];
  };

  registerListener = (ref, id) => {
    if (!this.listeners[id]) this.listeners[id] = ref;
  };

  unregisterListener = (ref, id) => {
    if (this.listeners[id]) delete this.listeners[id];
  };

  render() {
    const count = this.computeCount();
    const { select, ...rest } = this.state;
    return (
      <DragContext.Provider value={this}>
        {this.props.children}
        <Ghost {...rest} count={count} />
        <DragSelect select={select} />
      </DragContext.Provider>
    );
  }
}

DragProvider.defaultProps = {
  dragTimeout: 150,
};
