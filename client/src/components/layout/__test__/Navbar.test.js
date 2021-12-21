import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';
import { Provider } from 'react-redux';
import store from '../../../store';

it('should render same text', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <Navbar title='My Header' />
      </Router>
    </Provider>
  );
  const headingElement = screen.getByRole('heading');
  expect(headingElement).toBeInTheDocument();
});
