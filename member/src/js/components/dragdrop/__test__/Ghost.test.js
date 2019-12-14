import React from 'react';
import { shallow } from 'enzyme';
import { Ghost, GhostContent } from '../Ghost';

describe('[CO_1000] [UN_1000_0004] Ghost', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Ghost />);
  });

  it('should not break without props', async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should append the correct dragging css class', async () => {
    const props = {
      draggable: null,
      position: { x: 0, y: 0 },
      count: 0,
    };
    wrapper.setProps(props);
    const draggingClass = '.test-dragging-class';
    wrapper.setProps({ draggingClass });
    const child = wrapper.find('.ghost').childAt(0);
    expect(child.props().className).toBe(draggingClass);
  });

  it('should render ghost at correct position', async () => {
    const style = wrapper.find('.ghost').props().style;
    expect(style.transform).toBe('translate3d(0px, 0px, 0px)');
  });

  it('should update the ghost render position', async () => {
    wrapper.setProps({ position: { x: 256, y: 128 } });
    const style = wrapper.find('.ghost').props().style;
    expect(style.transform).toBe('translate3d(256px, 128px, 0px)');
  });

  it('should not render transition group child when no children exist', async () => {
    const transitionGroup = wrapper.find('TransitionGroup');
    expect(transitionGroup.props().children).toBeNull();
  });

  it('should render transition group child when children exist', async () => {
    const children = <div>hello</div>;
    const draggable = { props: { children } };
    wrapper.setProps({ draggable });
    const transitionGroup = wrapper.find('TransitionGroup');
    expect(transitionGroup.props().children).toBeTruthy();
  });
});

describe('[CO_1000] [UN_1000_0005] Ghost content', () => {
  let wrapper;
  beforeAll(() => {
    const props = {
      draggable: null,
      count: 0,
    };
    wrapper = shallow(<GhostContent {...props} />);
  });

  it('should display the correct count in the ghost badge', async () => {
    expect(wrapper.find('span').text()).toEqual('0');
    wrapper.setProps({ count: 5 });
    expect(wrapper.find('span').text()).toEqual('5');
  });

  it('should not render draggable children', async () => {
    expect(wrapper.find('.inner').children()).toHaveLength(1);
  });

  it('should append draggable children to ghost', async () => {
    const children = <div id="children">hello</div>;
    const draggable = {
      props: { children: children },
    };
    wrapper.setProps({ draggable });
    expect(wrapper.find('#children').text()).toEqual('hello');
  });
});
