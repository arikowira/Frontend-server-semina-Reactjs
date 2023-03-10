import { Navigate, Route, Routes } from 'react-router-dom';
import GuardRoute from '../components/guardRoute';
import GuestOnlyRoute from '../components/guestOnlyRoute';

import Signin from '../pages/signin';
import { HomeRoute } from './HomeRoute';
import { TalentsRoute } from './TalentsRoute';
import { CategoriesRoute } from './CategoriesRoute';
import { PaymentsRoute } from './PaymentsRoute';
import SNavbar from '../components/navbar';
import { EventsRoute } from './EventsRoute';
import { OrdersRoute } from './OrdersRoute';
import { ParticipantsRoute } from './ParticipantsRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/signin'
        element={
          <GuestOnlyRoute>
            <Signin />
          </GuestOnlyRoute>
        }
      />
      <Route
        path='/'
        element={
          <>
            <SNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path='dashboard/*' element={<HomeRoute />} />
        <Route path='categories/*' element={<CategoriesRoute />} />
        <Route path='talents/*' element={<TalentsRoute />} />
        <Route path='participants/*' element={<ParticipantsRoute />} />
        <Route path='payments/*' element={<PaymentsRoute />} />
        <Route path='events/*' element={<EventsRoute />} />
        <Route path='orders/*' element={<OrdersRoute />} />
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  );
}