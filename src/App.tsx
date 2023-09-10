import { Routes, Route } from 'react-router-dom';
import Signin from './pages/auth/signin/index.tsx';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
       </Routes>
    </>
 );
};

export default App;