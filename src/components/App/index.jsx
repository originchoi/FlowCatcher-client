import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../Home/MainPage";
import Dashboard from "../Dashboard/Dashboard";
import Projects from "../Dashboard/Projects";
import Conversion from "../Dashboard/Conversion";
import ErrorPage from "../Shared/ErrorPage";
import Behavior from "../Dashboard/Behavior";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate replace to="/dashboard/Projects" />} />
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/analytics/behavior" element={<Behavior />} />
        <Route
          path="/dashboard/analytics/conversion"
          element={<Conversion />}
        />
      </Route>
      <Route path="*" element={<ErrorPage errorMessage="404 Not Found!!" />} />
    </Routes>
  );
}

export default App;
