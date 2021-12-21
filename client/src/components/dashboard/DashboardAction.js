import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div>
      <div className='dash-buttons'>
        <Link to='/edit-profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary' data-testid='edit'></i>{' '}
          Edit Profile
        </Link>
        <Link to='/add-experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary'></i> Add Experience
        </Link>
      </div>
    </div>
  );
};

export default DashboardAction;
