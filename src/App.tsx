import "./App.css";
import { Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<MainPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
