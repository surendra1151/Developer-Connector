import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated }) => {
  const [userData, setUserData] = useState('');
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  if (userData) {
    return (
      <div>
        <h1>
          <span data-testid='name'>{userData.name}</span>
        </h1>
        <p data-testid='userId'>{userData.id}</p>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const { email, password } = values;
        //This fetch call is regarding testing MSW mock api call, If you would like to have orginal User Experience comment fecth call and uncomment "login(email, password")
        fetch('/signin', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          // Update the state with the received response
          .then(setUserData);

        //login(email, password);
      }}
    >
      {(formik) => (
        <div>
          <h1 className='large text-primary'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <Form
            className='form'
            data-testid='form'
            onSubmit={formik.handleSubmit}
          >
            <div className='form-group'>
              <input
                type='email'
                data-testid='email'
                placeholder='Email Address'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='signup-errors' data-testid='emailError'>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className='form-group'>
              <input
                data-testid='password'
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='signup-errors' data-testid='passwordError'>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <input
              type='submit'
              className='btn btn-primary'
              data-testid='login'
              value='Login'
            />
          </Form>

          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
          {/* This Data is Regarding displaying our responses from mock ApI */}
          {userData && (
            <div>
              {
                <h1>
                  <span data-testid='name'>{userData.name}</span>
                </h1>
              }
              <p data-testid='userId'>{userData.id}</p>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
