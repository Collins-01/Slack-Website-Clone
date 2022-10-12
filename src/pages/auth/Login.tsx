import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, provider } from "../../firebase_app";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignIn = async () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((credentials) => {
        setLoading(false);
        if (credentials.user) {
          navigate("/home", {
            replace: true,
          });
        } else {
          setLoading(false);
          alert("An error occured, please try again.");
        }
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://imgs.search.brave.com/Q7m1k7UD1gN1RKWDxmZvbvvfnF7OAoJdNsUs6x-KkRs/rs:fit:599:599:1/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzA4L3NsYWNrLWxv/Z28tMy01OTl4NTk5/LnBuZw"
          alt=""
        />
        <h1>Sign In to HALOGENS</h1>
        <p>halogens.slack.com</p>
        {loading ? (
          <LoadingIndicator>
            <Spinner name="ball-spin-fade-loader" color="green" fadeIn="none" />
          </LoadingIndicator>
        ) : (
          <Button onClick={handleSignIn}>Sign In with Google</Button>
        )}
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoadingIndicator = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  align-items: center;
  margin-top: 60px;
  /* justify-items: center; */
`;

const LoginContainer = styled.div`
  place-items: center;
  height: 100vh;
  display: grid;
  background-color: #f8f8f8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
