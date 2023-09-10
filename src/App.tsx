import { Routes, Route } from 'react-router-dom';
import Signin from './pages/auth/signin/index.tsx';
import Layout from './components/layout/index.tsx';
import Admin from './pages/admin/index.tsx';
import Employees from './pages/admin/employee/index.tsx';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="/admin/dashboard" element={<Layout><Admin /></Layout>} />
          <Route path="/admin/employees" element={<Layout><Employees /></Layout>} />
          <Route path="/admin/tasks" element={<Layout><Employees /></Layout>} />
       </Routes>
    </>
 );
};

export default App;