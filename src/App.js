// Import Route
import { Route, Routes } from "react-router-dom";

// Import Components

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import "./App.css";
import { AuthComponent } from "./components/AuthRoute/AuthComponent";
import Publish from "./pages/Publish";
import Article from "./pages/Article";
import Home from "./pages/Home";
import { HistoryRouter, history } from "./utils/history";

// Implement routes
function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }
          >
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
