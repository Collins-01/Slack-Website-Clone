import React from 'react'
import styled from 'styled-components'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAppSelector } from '../app/hooks';
import { selectApp } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebase_app';

function Chat() {
    const appState = useAppSelector(selectApp);
    
    
  return (
    <ChatContainer>
       <>
       <ChatHeader>
            <ChatHeaderLeft>
                <h4> <strong>{appState.roomId}</strong> </h4>
                <StarOutlineOutlinedIcon/>
            </ChatHeaderLeft>

            <ChatHeaderRight>
                <p>
                    <InfoOutlinedIcon/> Details
                </p>
            </ChatHeaderRight>
        </ChatHeader>
        
        <ChatMessages>
            <ChatInput channelID='' channelName=''/>
        </ChatMessages>
       </>
       
        
    </ChatContainer>
  )
}

export default Chat


const ChatContainer = styled.div`
    flex: 0.7;
    overflow-y: scroll;
    flex-grow: 1;
    margin-top: 60px;

`;

const ChatHeader = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`;



const ChatHeaderLeft = styled.div`
display: flex;
align-items: center;
 >h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
 }

    >h4 > .MuiSVgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }

`;
const ChatHeaderRight = styled.div`
    >p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    >p > .MuiSVgIcon-root{ 
        margin-right: 5px !important;
        font-size: 16px;
    }

`;



const ChatMessages = styled.div``;