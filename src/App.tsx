import React from "react";
import "./App.css";
// import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase_app";
import { Route, Routes } from "react-router-dom";
import Protected, { ProtectedRouteProps } from "./components/Protected";
import Login from "./pages/auth/Login";
import HomePage from "./pages/home/HomePage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [user, loading] = useAuthState(auth);
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: user !== null && user !== undefined,
    authenticationPath: "/",
  };

  return (
    <div className="app">
      {loading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <Protected
                {...defaultProtectedRouteProps}
                outlet={<HomePage />}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;

// const AppBody = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// https://images.unsplash.com/photo-1657299143549-73fb118d68aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80
