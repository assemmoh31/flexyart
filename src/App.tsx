/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Tools from './pages/Tools';
import Themes from './pages/Themes';
import Pricing from './pages/Pricing';
import ArtworkDetail from './pages/ArtworkDetail';
import Profile from './pages/Profile';
import UploadPage from './pages/UploadPage';
import CreatorStudio from './pages/CreatorStudio';
import AdminDashboard from './pages/AdminDashboard';
import BackgroundDetail from './pages/BackgroundDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="artwork/:id" element={<ArtworkDetail />} />
          <Route path="creator/:handle" element={<Profile />} />
          <Route path="tools" element={<Tools />} />
          <Route path="themes" element={<Themes />} />
          <Route path="themes/:id" element={<BackgroundDetail />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="studio" element={<CreatorStudio />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
