import React from 'react'
import styled from 'styled-components';
import Chat from '../../components/Chat';
import Header from '../../components/Header'
import SideBar from '../../components/SideBar';

function HomePage() {
  return (
    <div>
       <Header/>
      <AppBody>
        <SideBar/>
        <Chat/>
      </AppBody>
    </div>
  )
}

export default HomePage;




const AppBody = styled.div`
display: flex;
height: 100vh;
`;


