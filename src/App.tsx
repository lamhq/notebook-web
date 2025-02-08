import { Route, Routes } from 'react-router';
import ActivityListPage from './diary/pages/ActivityListPage';
import AddActivityPage from './diary/pages/AddActivityPage';
import UpdateActivityPage from './diary/pages/UpdateActivityPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ActivityListPage />} />
      <Route path="/activities/new" element={<AddActivityPage />} />
      <Route path="/activities/:id" element={<UpdateActivityPage />} />
    </Routes>
  );
}
