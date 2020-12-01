import React from 'react';
import renderer from 'react-test-renderer';
import {ButtonsGroup} from '../ButtonsGroup';

//TODO: complete all unit tests and cases

test('ButtonsGroup renders correctly 0', () => {
    const component= renderer.create(<ButtonsGroup />)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('ButtonsGroup renders correctly 1', () => {
    const component= renderer.create(<ButtonsGroup showButtonLoading={undefined} login={()=>{}}  />)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('ButtonsGroup renders correctly 2', () => {
    const component= renderer.create(<ButtonsGroup showButtonLoading={true} login={undefined}  />)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('ButtonsGroup renders correctly 3', () => {
    const component= renderer.create(<ButtonsGroup showButtonLoading={null} login={true}  />)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('ButtonsGroup renders correctly 4', () => {
    const component= renderer.create(<ButtonsGroup showButtonLoading={'sss'} login={true}  />)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
