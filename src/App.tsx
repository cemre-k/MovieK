import "./App.css";
import { Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
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
