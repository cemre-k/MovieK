import "./App.css";
import { Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path='/search'
          element={<SearchResultsPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
