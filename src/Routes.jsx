import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Checker from "./pages/Checker";
import Compare from "./pages/Compare";
import App from "./App";

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
            path="/history"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <History />
              </motion.div>
            }
          />
          <Route
            path="/Compare"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Compare />
              </motion.div>
            }
          />
          <Route
            path="/checker"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Checker />
              </motion.div>
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
