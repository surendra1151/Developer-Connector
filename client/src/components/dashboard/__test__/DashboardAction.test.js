import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardAction from '../DashboardAction';
import { Provider } from 'react-redux';
import store from '../../../store';

describe('Dashboard Action render Page', () => {
  it('renders the Dashboard edit profile', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <DashboardAction />
        </Router>
      </Provider>
    );

    expect(getByText(/Edit Profile/i)).toBeInTheDocument();
    expect(getByText(/Add Experience/i)).toBeInTheDocument();
  });
});
