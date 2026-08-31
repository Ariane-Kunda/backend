import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import BrowseJobs from './pages/BrowseJobs';
import JobDetail from './pages/JobDetail';
import ApplyJob from './pages/ApplyJob';
import Login from './pages/Login';
import Register from './pages/Register';
import MyApplications from './pages/MyApplications';
import NotFound from './pages/NotFound';

import AdminDashboard from './pages/admin/Dashboard';
import AdminJobForm from './pages/admin/JobForm';
import AdminApplications from './pages/admin/Applications';

import { restoreSession } from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // A stored token is exchanged for the current user once, on first load.
  useEffect(() => {
    if (token && !user) dispatch(restoreSession());
  }, [dispatch, token, user]);

  return (
    <Routes>
      {/* Public board */}
      <Route element={<PublicLayout />}>
        <Route index element={<BrowseJobs />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Signed in, any role */}
        <Route element={<ProtectedRoute />}>
          <Route path="jobs/:id/apply" element={<ApplyJob />} />
          <Route path="applications" element={<MyApplications />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      {/*
        Admin area. AdminRoute redirects anyone who is not an admin, and the
        matching API routes are guarded server-side, so there is no path in
        which a candidate reaches admin data.
      */}
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="jobs" element={<AdminDashboard />} />
          <Route path="jobs/new" element={<AdminJobForm />} />
          <Route path="jobs/:id/edit" element={<AdminJobForm />} />
          <Route path="jobs/:id/applicants" element={<AdminApplications />} />
          <Route path="applications" element={<AdminApplications />} />
        </Route>
      </Route>
    </Routes>
  );
}
