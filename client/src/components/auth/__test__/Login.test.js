import React from 'react';
import {
  render,
  screen,
  fireEvent,
  
} from '@testing-library/react';

import Login from '../Login';
import { Provider } from 'react-redux';
import store from '../../../store';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { Formik } from 'formik';

test('allows the user to log in and returns response', async () => {
  const { getByPlaceholderText, getByTestId } = render(
    <Provider store={store}>
      <Router>
        <Formik>
          <Login />
        </Formik>
      </Router>
    </Provider>
  );
  await userEvent.type(
    screen.getByPlaceholderText(/Email Address/i),
    'kishore.usapp@gmail.com'
  );
  await userEvent.type(
    screen.getByPlaceholderText(/Password/i),
    'kishanya1402'
  );
  userEvent.click(screen.getByRole('button', { name: /Login/i }));
  expect(
    await screen.findByText('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')
  ).toBeInTheDocument();

  expect(await screen.findByText(/kishore/i)).toBeInTheDocument();
});

describe('Login render Page', () => {
  it('renders the Login page', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('render 2 input components', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(getByText('Login')).toBeInTheDocument();
  });
});

describe('Form behaviour', () => {
  it('should have validation error given input field is touched and error exists on form', async () => {
    const { getByTestId, getByPlaceholderText, queryByText } = render(
      <Formik
        validate={(values) => {
          let errors = {};

          if (!values.firstName) {
            errors.firstName = 'Required.';
          }

          return errors;
        }}
      >
        <Provider store={store}>
          <Router>
            <Login6 />
          </Router>
        </Provider>
      </Formik>
    );

    await (() => {
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
