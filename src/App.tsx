import { Routes, Route } from 'react-router-dom';
import Signin from './pages/auth/signin/index.tsx';
import Layout from './components/layout/index.tsx';
import Admin from './pages/admin/index.tsx';
import Employees from './pages/admin/employee/index.tsx';
import Tasks from './pages/admin/task/index.tsx';
import { useEffect } from 'react';
import { getUser } from './utils/localStorage.ts'
import { useNavigate } from "react-router-dom";
import Notify from './components/utils/Notify.ts'

const App = () => {
   const navigate = useNavigate();
   // Authentication
   useEffect(()=> {
      if (!getUser()) {
         navigate("/");
         Notify('Please Login', 'error');
      }
   }, [])
 return (
    <>
       <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="/admin/dashboard" element={<Layout><Admin /></Layout>} />
          <Route path="/admin/employees" element={<Layout><Employees /></Layout>} />
          <Route path="/admin/tasks" element={<Layout><Tasks /></Layout>} />
       </Routes>
    </>
 );
};

export default App;