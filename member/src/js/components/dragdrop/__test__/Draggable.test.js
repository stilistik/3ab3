import React from 'react';
import { shallow } from 'enzyme';
import { Draggable } from '../Draggable';

describe('[CO_1000] [UN_1000_0000] Draggable', () => {
  let wrapper;
  const dragContext = {
    registerDraggable: jest.fn(),
    unregisterDraggable: jest.fn(),
    selectDraggable: jest.fn(),
    onDragStart: jest.fn(),
    selected: {},
    props: {
      dragTimeout: 100,
    },
  };

  beforeAll(() => {
    jest.useFakeTimers();
    wrapper = shallow(<Draggable dragContext={dragContext} />);
  });

  it('should render its children', async () => {
    const children = <div id="children">hello</div>;
    wrapper.setProps({ children });
    expect(wrapper.find('#children')).toBeTruthy();
  });

  it('should register draggable with dragContext', async () => {
    expect(dragContext.registerDraggable.mock.calls.length).toBe(1);
  });

  it('should render SelectedIndicator', async () => {
    expect(wrapper.find('SelectedIndicator')).toBeTruthy();
  });

  it('should not be selected by default', async () => {
    expect(wrapper.find('.selected').exists()).toBeFalsy();
  });

  it('should be selectable', async () => {
    const id = wrapper.instance().id;
    dragContext.selected = { [id]: wrapper.instance() };
    wrapper.setProps({ dragContext });
    expect(wrapper.find('.selected').exists()).toBeTruthy();
  });

  it('should add the selectedClass prop to the div when selected', async () => {
    const id = wrapper.instance().id;
    dragContext.selected = { [id]: wrapper.instance() };
    wrapper.setProps({ dragContext, selectedClass: 'test-class' });
    expect(wrapper.find('.test-class').exists()).toBeTruthy();
  });

  it('should not call dragContext onDragStart when disabled on mouse down', async () => {
    wrapper.setProps({ disabled: true });
    await wrapper.simulate('mousedown', {
      button: 0,
      shiftKey: false,
      ctrlKey: false,
      cmdKey: false,
    });
    jest.runAllTimers();
    expect(dragContext.onDragStart.mock.calls.length).toBe(0);
  });

  it('should call dragContext onDragStart and not selectDraggable on mouse down', async () => {
    wrapper.setProps({ disabled: false });
    await wrapper.simulate('mousedown', {
      button: 0,
      shiftKey: false,
      ctrlKey: false,
      cmdKey: false,
    });
    jest.runAllTimers();
    expect(dragContext.onDragStart.mock.calls.length).toBe(1);
    expect(dragContext.selectDraggable).not.toHaveBeenCalled();
  });

  it('should call selectDraggable when shift key is pressed on mouse down', async () => {
    const stopPropagation = jest.fn();
    wrapper.setProps({ disabled: false });
    await wrapper.simulate('mousedown', {
      button: 0,
      shiftKey: true,
      ctrlKey: false,
      cmdKey: false,
      stopPropagation: stopPropagation,
    });
    jest.runAllTimers();
    expect(dragContext.selectDraggable).toHaveBeenCalled();
  });
});
