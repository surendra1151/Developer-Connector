import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const Register = ({ register, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password2: '',
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        if (values.password !== values.password2) {
          setAlert('password do not match', 'danger');
        } else {
          const { name, email, password } = values;
          console.log(password);
          register({ name, email, password });
          console.log(name, password, email);
        }
      }}
    >
      {(formik) => (
        <div>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <Form className='form' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='signup-errors' data-testid='nameError'>
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <small className='form-text'>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
              {formik.touched.email && formik.errors.email ? (
                <div className='signup-errors' data-testid='emailError'>
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                data-testid='password'
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='signup-errors' data-testid='passwordError'>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={formik.values.password2}
                onChange={formik.handleChange}
                data-testid='confirm'
              />
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className='signup-errors' data-testid='password2Error'>
                  {formik.errors.password2}
                </div>
              ) : null}
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </Form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      )}
    </Formik>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
