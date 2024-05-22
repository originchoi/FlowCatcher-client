import { Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../MainPage";
import Dashboard from "../Dashboard";
import Overview from "../Overview";
import Projects from "../Projects";
import Conversion from "../Conversion";
import ErrorPage from "../ErrorPage";
import Behavior from "../Behavior";
import MobileAcess from "../MobileAccess";

function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return <MobileAcess />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate replace to="/dashboard/overview" />} />
        <Route path="/dashboard/overview" element={<Overview />} />
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
