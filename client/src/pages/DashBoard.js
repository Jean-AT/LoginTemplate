import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import ChangeData from '../pages/ChangeData';
import DeleteAcount from '../pages/DeleteAcount';

export default function Home() {
  return (
    <div className="Home">
        <Router>
          <div className='navbar'>
            <Link to="/Delete"> Delete Acount</Link>
            <Link to="/ChangeData"> Change Data</Link>
            <Link to="/DashBoard"> Home</Link>
          </div>
        <Routes>
          <Route path="/ChangeData" element={<ChangeData/>} />
          <Route path="/Delete" element={<DeleteAcount/>} />
          <Route path="/DashBoard" element={<DashBoard/>} />
        </Routes>
      </Router>
      <h1>HOla</h1>
    </div>
  );
}