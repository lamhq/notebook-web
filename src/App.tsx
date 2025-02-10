import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router';
import ErrorFallback from './common/organism/ErrorFallback';
import NotFoundPage from './common/pages/NotFoundPage';
import MainLayout from './common/templates/MainLayout';
import ActivityListPage from './diary/pages/ActivityListPage';
import AddActivityPage from './diary/pages/AddActivityPage';
import UpdateActivityPage from './diary/pages/UpdateActivityPage';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ActivityListPage />} />
          <Route path="/activities/new" element={<AddActivityPage />} />
          <Route path="/activities/:id" element={<UpdateActivityPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
