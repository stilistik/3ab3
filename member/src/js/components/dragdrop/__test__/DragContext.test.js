import React from 'react';
import { shallow, mount } from 'enzyme';
import { DragProvider, withDragContext } from '../DragContext';

const rect_0 = { left: 80, top: 100, right: 280, bottom: 140 };
const rect_1 = { left: 80, top: 200, right: 280, bottom: 240 };

const DRAGGABLES = [
  {
    id: 'draggable_0',
    update: jest.fn(),
    onDragStart: jest.fn(),
    onDragEnd: jest.fn(),
    getBoundingClientRect: jest.fn().mockReturnValue(rect_0),
    props: {
      group: 'default',
    },
  },
  {
    id: 'draggable_1',
    update: jest.fn(),
    onDragStart: jest.fn(),
    onDragEnd: jest.fn(),
    getBoundingClientRect: jest.fn().mockReturnValue(rect_1),
    props: {
      group: 'default',
    },
  },
];

const CONTAINERS = [
  {
    id: 'container_0',
    boundingRect: rect_0,
    getBoundingClientRect: jest.fn().mockReturnValue(rect_0),
    onDragStart: jest.fn(),
    onDragEnd: jest.fn(),
    onDrop: jest.fn(),
    props: {
      group: 'default',
    },
  },
  {
    id: 'container_1',
    boundingRect: rect_1,
    getBoundingClientRect: jest.fn().mockReturnValue(rect_1),
    onDragStart: jest.fn(),
    onDragEnd: jest.fn(),
    onDrop: jest.fn(),
    props: {
      group: 'other',
    },
  },
];

describe('[CO_1000] [UN_1000_0002] Drag context', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<DragProvider />);
  });

  afterEach(() => {
    for (let draggable of DRAGGABLES) {
      for (let p in draggable) {
        if (draggable[p].mock) draggable[p].mockClear();
      }
    }
    for (let container of CONTAINERS) {
      for (let p in container) {
        if (container[p].mock) container[p].mockClear();
      }
    }
  });

  it('should render children and ghost', async () => {
    const children = <div id="children">hello</div>;
    wrapper.setProps({ children });
    expect(wrapper.find('#children')).toBeTruthy();
    expect(wrapper.find('Ghost')).toBeTruthy();
  });

  it('should register draggables', async () => {
    DRAGGABLES.forEach((draggable) =>
      wrapper.instance().registerDraggable(draggable, draggable.id)
    );
    expect(Object.keys(wrapper.instance().draggables)).toHaveLength(2);
  });

  it('should not register the same draggables twice', async () => {
    DRAGGABLES.forEach((draggable) =>
      wrapper.instance().registerDraggable(draggable, draggable.id)
    );
    expect(Object.keys(wrapper.instance().draggables)).toHaveLength(2);
  });

  it('should register containers', async () => {
    CONTAINERS.forEach((container) =>
      wrapper.instance().registerContainer(container, container.id)
    );
    expect(Object.keys(wrapper.instance().containers)).toHaveLength(2);
  });

  it('should select draggable and call update on draggable when selected', async () => {
    const draggable = DRAGGABLES[0];
    draggable.update.mockClear();
    wrapper.instance().selectDraggable(draggable);
    expect(Object.values(wrapper.instance().selected)).toContain(draggable);
    expect(draggable.update).toHaveBeenCalled();
  });

  it('should deselect draggable and call update on draggable when deselected', async () => {
    const draggable = DRAGGABLES[0];
    draggable.update.mockClear();
    wrapper.instance().deselectDraggable(draggable);
    expect(Object.values(wrapper.instance().selected)).not.toContain(draggable);
    expect(draggable.update).toHaveBeenCalled();
  });

  it('should select the draggable with a select drag movement', async () => {
    wrapper.instance().onMouseDown({ x: 70, y: 90, button: 0 });
    wrapper.instance().onMouseMove({ x: 90, y: 110 }); // exceed delta -> onSelectStart
    wrapper.instance().onMouseMove({ x: 91, y: 111 }); // onSelectMove
    wrapper.instance().onMouseUp();
    expect(Object.values(wrapper.instance().selected)).toContain(DRAGGABLES[0]);
  });

  it('should add other draggable with shift key pushed', async () => {
    wrapper
      .instance()
      .onMouseDown({ x: 70, y: 190, button: 0, shiftKey: true });
    wrapper.instance().onMouseMove({ x: 90, y: 210, shiftKey: true }); // exceed delta -> onSelectStart
    wrapper.instance().onMouseMove({ x: 91, y: 211, shiftKey: true }); // onSelectMove
    wrapper.instance().onMouseUp();
    expect(Object.values(wrapper.instance().selected)).toHaveLength(2);
    expect(Object.values(wrapper.instance().selected)).toContain(DRAGGABLES[1]);
  });

  it('should not start dragging when selection is in process', async () => {
    wrapper
      .instance()
      .onMouseDown({ x: 70, y: 190, button: 0, shiftKey: true });
    wrapper.instance().onMouseMove({ x: 91, y: 211, shiftKey: true }); // exceed delta -> onSelectStart
    wrapper.instance().onDragStart(DRAGGABLES[0]);
    expect(wrapper.instance().dragging).toBeFalsy();
    wrapper.instance().onMouseUp();
  });

  it('should select all draggables and call update on them', async () => {
    wrapper.instance().selectAll();
    expect(Object.values(wrapper.instance().selected)).toHaveLength(2);
    for (let draggable of DRAGGABLES) {
      expect(draggable.update).toHaveBeenCalled();
    }
  });

  it('should deselect and call update on all previously selected draggables', async () => {
    wrapper.instance().deselectAll();
    expect(Object.values(wrapper.instance().selected)).toHaveLength(0);
    for (let draggable of DRAGGABLES) {
      expect(draggable.update).toHaveBeenCalled();
    }
  });

  it('should call onDragStart on draggable and containers and render ghost', async () => {
    const draggable = DRAGGABLES[0];
    draggable.onDragStart.mockClear();
    CONTAINERS[0].onDragStart.mockClear();
    CONTAINERS[1].onDragStart.mockClear();
    await wrapper.instance().onDragStart(draggable);
    const ghost = wrapper.find('Ghost');
    expect(ghost.props().draggable).toBeTruthy();
    expect(ghost.props().count).toEqual(1);
    expect(draggable.onDragStart).toHaveBeenCalled();
    expect(CONTAINERS[0].onDragStart).toHaveBeenCalled();
    expect(CONTAINERS[1].onDragStart).toHaveBeenCalled();
  });

  it('should call onDragEnd on draggable and containers', async () => {
    const draggable = DRAGGABLES[0];
    draggable.onDragEnd.mockClear();
    CONTAINERS[0].onDragEnd.mockClear();
    CONTAINERS[1].onDragEnd.mockClear();
    wrapper.instance().onDragEnd();
    expect(draggable.onDragEnd).toHaveBeenCalled();
    expect(CONTAINERS[0].onDragEnd).toHaveBeenCalled();
    expect(CONTAINERS[1].onDragEnd).toHaveBeenCalled();
  });

  it('should pass correct draggable count to ghost', async () => {
    const toDrag = DRAGGABLES[0];
    const toSelect = DRAGGABLES[1];
    wrapper.instance().selectDraggable(toSelect);
    wrapper.instance().onDragStart(toDrag);
    const ghost = wrapper.find('Ghost');
    expect(ghost.props().draggable).toBeTruthy();
    expect(ghost.props().count).toEqual(2);
  });

  it('should allow dropping into container of same group', async () => {
    const draggable = DRAGGABLES[0];
    const container = CONTAINERS[0];
    container.onDrop.mockClear();
    draggable.onDragEnd.mockClear();
    wrapper.instance().onDragStart(draggable);
    wrapper.instance().onDragOver(container);
    wrapper.instance().onDragEnd();
    const ghost = wrapper.find('Ghost');
    expect(ghost.props().transition).toEqual('drop');
    expect(container.onDrop).toHaveBeenCalled();
    expect(draggable.onDragEnd).toHaveBeenCalled();
  });

  it('should not allow dropping into container of other group', async () => {
    const draggable = DRAGGABLES[0];
    const container = CONTAINERS[1];
    container.onDrop.mockClear();
    container.onDragEnd.mockClear();
    draggable.onDragEnd.mockClear();
    wrapper.instance().onDragStart(draggable);
    wrapper.instance().onDragOver(container);
    wrapper.instance().onDragEnd();
    const ghost = wrapper.find('Ghost');
    expect(ghost.props().transition).toEqual('lose');
    expect(container.onDrop).not.toHaveBeenCalled();
    expect(container.onDragEnd).toHaveBeenCalled();
    expect(draggable.onDragEnd).toHaveBeenCalled();
  });

  it('should not allow dropping into forbidden container', async () => {
    const draggable = DRAGGABLES[0];
    const container = CONTAINERS[0];
    container.props.forbidden = true;
    container.onDrop.mockClear();
    container.onDragEnd.mockClear();
    draggable.onDragEnd.mockClear();
    wrapper.instance().onDragStart(draggable);
    wrapper.instance().onDragOver(container);
    wrapper.instance().onDragEnd();
    const ghost = wrapper.find('Ghost');
    expect(ghost.props().transition).toEqual('lose');
    expect(container.onDrop).not.toHaveBeenCalled();
    expect(container.onDragEnd).toHaveBeenCalled();
    expect(draggable.onDragEnd).toHaveBeenCalled();
  });

  it('should play lose animation when drag ends outside of containers', async () => {
    const draggable = DRAGGABLES[0];
    wrapper.instance().onDragStart(draggable);
    wrapper.instance().onDragMove({ x: 500, y: 500 });
    wrapper.instance().onDragEnd();
    const ghost = wrapper.find('Ghost');
    expect(ghost.props().transition).toEqual('lose');
    for (let container of CONTAINERS) {
      expect(container.onDrop).not.toHaveBeenCalled();
    }
  });

  it('should unregister and deselect the draggables', async () => {
    DRAGGABLES.forEach((draggable) =>
      wrapper.instance().unregisterDraggable(draggable, draggable.id)
    );
    expect(Object.values(wrapper.instance().selected)).toHaveLength(0);
    expect(Object.values(wrapper.instance().draggables)).toHaveLength(0);
  });

  it('should unregister the containers', async () => {
    CONTAINERS.forEach((container) =>
      wrapper.instance().unregisterContainer(container, container.id)
    );
    expect(Object.values(wrapper.instance().containers)).toHaveLength(0);
  });
});

describe('[CO_1000] [UN_1000_0003] Component with drag context', () => {
  const DragComponent = ({ children }) => {
    return <div id="drag-component">{children}</div>;
  };
  const WrappedComponent = withDragContext(DragComponent);

  it('should render its children', async () => {
    const props = { children: <div id="children" /> };
    const wrapper = mount(<WrappedComponent {...props} />);
    expect(wrapper.exists('#drag-component')).toBeFalsy();
    expect(wrapper.exists('#children')).toBeTruthy();
  });

  it('should render itself', async () => {
    const props = { children: <div id="children" /> };
    const wrapper = mount(
      <DragProvider>
        <WrappedComponent {...props} />
      </DragProvider>
    );
    expect(wrapper.exists('#drag-component')).toBeTruthy();
    expect(wrapper.exists('#children')).toBeTruthy();
  });
});
