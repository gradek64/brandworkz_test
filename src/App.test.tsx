import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('renders App component', async () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
