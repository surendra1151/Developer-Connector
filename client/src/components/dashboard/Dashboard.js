import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from '../dashboard/DashboardAction';
import Experience from '../dashboard/Experience';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { StyledBadge, SmallAvatar } from '../../icons/Icon';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary' data-testid='dashboard'>
        Dashboard
      </h1>
      <div className='user-icon'>
        <Stack direction='row' spacing={2}>
          <StyledBadge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'
          >
            <Avatar>{user && user.name.charAt(0)}</Avatar>
          </StyledBadge>
        </Stack>
        <p className='lead'>Welcome {user && user.name}</p>
      </div>

      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fas-user-minus' data-testid='delete'></i> Delete
              My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p> You have not setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create profile{' '}
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
