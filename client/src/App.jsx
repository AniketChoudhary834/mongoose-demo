
import Departments from "./pages/Departments";
import Students from "./pages/Students";
import { ToastContainer, toast } from 'react-toastify';
import { Link, Route, Routes } from "react-router-dom";
import DepartmentDetails from "./pages/DepartmentDetails";

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link className="navbar_el" to="/departments">Departments</Link>
        <Link className="navbar_el" to="/students">Students</Link>
      </nav>
      
      <Routes>
        <Route path="/departments" element={<Departments/>} />
        <Route path="/departments/:id" element={<DepartmentDetails/>} />
        <Route path="/students" element={<Students/>} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
