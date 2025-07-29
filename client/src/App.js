import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Student Management</Link>
            <div>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Students</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Student</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
