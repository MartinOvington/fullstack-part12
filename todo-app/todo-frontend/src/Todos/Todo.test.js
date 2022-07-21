import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders todo', () => {
  const todo = {
    text: 'New todo',
    done: false,
  };
  const blankFunc = () => null;

  render(<Todo todo={todo} deleteTodo={blankFunc} completeTodo={blankFunc} />);

  const element = screen.getByText('New todo');
  expect(element).toBeDefined();
});
