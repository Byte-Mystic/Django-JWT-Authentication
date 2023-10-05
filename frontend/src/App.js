import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import PrivateRoute from "./utils/PrivateRoute";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<HomePage />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <PrivateRoute>
                <NotePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
