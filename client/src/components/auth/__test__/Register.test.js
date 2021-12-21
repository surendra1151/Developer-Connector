import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import '@testing-library/jest-dom/extend-expect';
import { Formik } from 'formik';

describe('Register render Page', () => {
  it('renders the Login page whether text is present or not', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    expect(getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('render input components', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    expect(getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(getByTestId(/password/i)).toBeInTheDocument;
    expect(getByTestId(/confirm/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    expect(getByText('Register')).toBeInTheDocument();
  });
});

describe('Form behaviour', () => {
  it('should have validation error given input field is touched and error exists on form', async () => {
    const { getByTestId, getByPlaceholderText, queryByText } = render(
      <Formik>
        <Provider store={store}>
          <Router>
            <Register />
          </Router>
        </Provider>
      </Formik>
    );

    await (() => {
      fireEvent.change(screen.getByPlaceholderText(/Name/i), {
        target: { value: 'kishore' },
      });

      fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
        target: { value: 'kishore.usapp@gmail.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: 'kishanya1402' },
      });
    });

    await (() => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(queryByText('Required')).not.toBeInTheDocument();
    expect(queryByText('Required')).not.toBeInTheDocument();
  });
});
