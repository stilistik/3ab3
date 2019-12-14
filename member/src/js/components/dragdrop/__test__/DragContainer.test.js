import React from 'react';
import { shallow } from 'enzyme';
import { DragContainer } from '../DragContainer';

describe('[CO_1000] [UN_1000_0002] Drag container', () => {
  let wrapper;
  const props = {
    dragContext: {
      registerContainer: jest.fn(),
      onDragOver: jest.fn(),
    },
    onDrop: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<DragContainer />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should call dragContext registerContainer', async () => {
    wrapper = shallow(<DragContainer {...props} />);
    expect(props.dragContext.registerContainer).toHaveBeenCalled();
  });

  it('should append .forbidden class', async () => {
    wrapper.setProps({ forbidden: true });
    wrapper.instance().onDragStart();
    expect(wrapper.find('.container').props().className).toContain('forbidden');
  });

  it('should append .dragover class on mouse enter', async () => {
    wrapper.instance().onDragStart();
    wrapper.find('.container').simulate('mouseenter');
    expect(wrapper.find('.container').props().className).toContain('dragover');
  });

  it('should call dragContext onDragEnter with container on mouse enter', async () => {
    props.dragContext.onDragOver.mockClear();
    wrapper.instance().onDragStart();
    wrapper.find('.container').simulate('mouseenter');
    expect(props.dragContext.onDragOver).toHaveBeenCalled();
  });

  it('should remove .dragover class on mouse leave', async () => {
    wrapper.find('.container').simulate('mouseleave');
    expect(wrapper.find('.container').props().className).not.toContain(
      'dragover'
    );
  });

  it('should call dragContext onDragOver with null on mouse leave', async () => {
    props.dragContext.onDragOver.mockClear();
    wrapper.find('.container').simulate('mouseleave');
    expect(props.dragContext.onDragOver).toHaveBeenCalledWith(null);
  });

  it('should remove .dragover class and not call props.onDrop when draggable elements are dropped to a forbidden container', async () => {
    const draggables = [{ id: 'draggable_0' }, { id: 'draggable_1' }];
    wrapper.instance().onDrop(draggables);
    expect(wrapper.find('.container').props().className).not.toContain(
      '.dragover'
    );
    expect(props.onDrop).not.toHaveBeenCalled();
  });

  it('should remove .dragover class and call props.onDrop when draggable elements are dropped to a container', async () => {
    wrapper.setProps({ forbidden: false });
    const draggables = [{ id: 'draggable_0' }, { id: 'draggable_1' }];
    wrapper.instance().onDrop(draggables);
    expect(wrapper.find('.container').props().className).not.toContain(
      '.dragover'
    );
    expect(props.onDrop).toBeCalledWith(draggables);
  });
});
