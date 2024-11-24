import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Checker from "./pages/Checker";
import Compare from "./pages/Compare";
import App from "./App";
import ProtectedRoute from "./ProtectedRoute";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Dashboard />
              </motion.div>
            }
          />
          <Route
            path="/checker"
            element={
              <ProtectedRoute>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Checker />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Compare />
                </motion.div>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export const AppRoutes = (
  <Router>
    <AnimatedRoutes />
  </Router>
);
