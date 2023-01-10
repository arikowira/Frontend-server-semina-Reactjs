import { Route, Routes } from 'react-router-dom';

import ParticipantsPage from '../pages/participants';
import ParticipantsDetail from '../pages/participants/detail';

export function ParticipantsRoute() {
  return (
    <Routes>
      <Route path='/' element={<ParticipantsPage />} />
      <Route path='/:id' element={<ParticipantsDetail />} />
    </Routes>
  );
}
