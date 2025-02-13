import { Route, Routes } from 'react-router';
import NotFoundPage from './common/pages/NotFoundPage';
import MainLayout from './common/templates/MainLayout';
import AddActivityPage from './diary/pages/AddActivityPage';
import ListActivityPage from './diary/pages/ListActivityPage';
import UpdateActivityPage from './diary/pages/UpdateActivityPage';
import { ErrorBoundary } from './error';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ListActivityPage />} />
          <Route path="/activities/new" element={<AddActivityPage />} />
          <Route path="/activities/:id" element={<UpdateActivityPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
