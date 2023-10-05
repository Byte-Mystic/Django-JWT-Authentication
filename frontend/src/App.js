import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignupPage,
  NotePage,
  NotesListPage,
} from "./pages";
import PrivateRoute from "./utils/PrivateRoute";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components";

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
