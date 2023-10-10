import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./component/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import LoadingScreen from "./component/LoadingScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import Questions from "./pages/Questions";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Routes>
              <Route path="*" element={<Navigate to="/authentication" />} />
              <Route path="/authentication" element={<Auth />} />
              <Route
                path="/:uid/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/:uid/quiz"
                element={
                  <PrivateRoute>
                    <Questions />
                  </PrivateRoute>
                }
              />
            </Routes>
          )}
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
