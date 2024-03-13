import { Routes, Route } from "react-router-dom";
import MainPage from "../MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<MainPage />} />
    </Routes>
  );
}

export default App;
