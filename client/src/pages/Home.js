import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import ChangeData from '../pages/ChangeData';
import DeleteAcount from '../pages/DeleteAcount';

export default function Home() {
  return (
    <div className="Home">
        <Router>
          <div className='navbar'>
            <Link to="/Login"> Login</Link>
            <Link to="/Registration"> Registration</Link>
            <Link to="/Delete"> Delete Acount</Link>
            <Link to="/ChangeData"> Change Data</Link>
            <Link to="/"> Home</Link>
          </div>
        <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/ChangeData" element={<ChangeData/>} />
          <Route path="/Delete" element={<DeleteAcount/>} />
          <Route path="/Registration" element={<Registration/>} />
        </Routes>
      </Router>
      <h1>HOla</h1>
    </div>
  );
}