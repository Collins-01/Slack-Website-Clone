import styled from 'styled-components';
import React from 'react'
import {Avatar} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase_app';
import {signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';


function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSignOut = async ()=>{
    await signOut(auth).
    then((e)=>{
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <HeaderContainer>
      {/* Header Left */}
        <HeaderLeft>
          <HeaderAvatar 
          src= {user?.photoURL ??""}
          alt ={user?.displayName ?? ""}
          onClick={handleSignOut}
          // TODO: Add OnClick.
          />
          <AccessTimeIcon/>
        </HeaderLeft>
        {/* Header Search */}
        <HeaderSearch>
          <SearchIcon/>
          <input placeholder='Search HALOGENS'/>
        </HeaderSearch>
        {/* Header Right */}
        <HeaderRight>
        <HelpOutlineIcon/>

        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header;




const HeaderContainer = styled.div`
display : flex;
position: fixed;
width: 100%;
align-items: center;
background-color: var(--slack-color);
justify-content: space-between;
color: white;
padding: 10px 0px;
`;

const HeaderLeft = styled.div`
flex: 0.3;
display: flex;
align-items: center;
margin-left: 20px;

> .MuiSvgIcon-root {
  margin-left: auto;
  margin-right: 30px;
}

`;

const HeaderAvatar = styled(Avatar)`
cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`; 


const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  display: flex;
  border: 1px gray solid;

  > input{ 
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vh ;
    outline: 0;
    color: white;
  }
`;


const HeaderRight = styled.div`
flex: 0.3;
align-items: flex-end;
display: flex;
 > .MuiSvgIcon-root { 
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
 }
`;