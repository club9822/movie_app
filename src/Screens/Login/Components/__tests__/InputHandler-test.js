import React from 'react';
import renderer from 'react-test-renderer';
import {InputHandler} from '../InputHandler';
test('InputHandler renders correctly 0', () => {
  const component = renderer.create(<InputHandler />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('InputHandler renders correctly 1', () => {
  const component = renderer.create(
    <InputHandler loginErrorMessage={undefined} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('InputHandler renders correctly 2', () => {
  const component = renderer.create(<InputHandler loginErrorMessage={null} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('InputHandler renders correctly 3', () => {
  const component = renderer.create(
    <InputHandler
      loginErrorMessage={'ddd'}
      dispatch={() => ({type: 'SSSS', payload: {key: '1', value: '2'}})}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
