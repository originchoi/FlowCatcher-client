import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../MainPage";
import Dashboard from "../Dashboard";
import Overview from "../Overview";
import Projects from "../Projects";
import ErrorPage from "../ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate replace to="/dashboard/overview" />} />
        <Route path="/dashboard/overview" element={<Overview />} />
        <Route path="/dashboard/projects" element={<Projects />} />
      </Route>
      <Route path="*" element={<ErrorPage errorMessage="404 Not Found!!" />} />
    </Routes>
  );
}

export default App;
