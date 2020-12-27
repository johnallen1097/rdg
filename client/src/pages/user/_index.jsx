import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '../../components/loading'
import NavLinks from '../../components/navlinks'

const Dashboard = lazy(() => import('./dashboard'))
const Profile = lazy(() => import('./profile'))
const ProfileUpdate = lazy(() => import('./profile-update'))
const History = lazy(() => import('./history'))

const User = ({ match }) => {
  const links = [
    {
      name: 'Dashboard',
      linkTo: '/user/dashboard',
      exact: true,
    },
    {
      name: 'User information',
      linkTo: '/user/profile',
      exact: false,
    },
    {
      name: 'History purchased',
      linkTo: '/user/history',
      exact: true,
    },
    {
      name: 'Logout',
      linkTo: '/logout',
      exact: true,
    },
  ]

  return (
    <div className='user'>
      <div className='user__links'>
        <NavLinks links={links} />
      </div>
      <div className='user__main'>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route
              path={`${match.path}/dashboard`}
              component={Dashboard}
              exact
            />
            <Route path={`${match.path}/profile`} component={Profile} exact />
            <Route
              path={`${match.path}/profile/update`}
              component={ProfileUpdate}
              exact
            />
            <Route path={`${match.path}/history`} component={History} exact />
          </Suspense>
        </Switch>
      </div>
    </div>
  )
}
export default User
