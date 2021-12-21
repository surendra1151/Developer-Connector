import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import Landing from '../Landing';

describe('Landing render Page', () => {
  it('renders the Home page', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Landing />
        </Router>
      </Provider>
    );

    expect(getByText(/Developer Connector/i)).toBeInTheDocument();
    expect(getByTestId(/content/i)).toBeInTheDocument();
    expect(getByText(/Sign Up/i)).toBeInTheDocument();
    expect(getByText(/Login/i)).toBeInTheDocument();
  });
});
