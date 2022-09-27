import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAppSelector } from '../app/hooks';
import { selectApp } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase_app';
import { DB } from '../constants';
import Message from './Message';

function Chat() {
    
    const chatRef = useRef<HTMLDivElement | null>(null);
    const appState = useAppSelector(selectApp);
    const roomQuery =  query(collection(db, DB.rooms));
    const messagesQuery = query(collection(db, DB.messages), orderBy('timestamp', 'asc'))
    const [roomDetails] = useCollection(roomQuery);
    const [messages,loading] = useCollection(messagesQuery);
    const roomMessages = ()=>{
        const filteredMessages = messages?.docs.filter((e)=>e.data()['channelID'] == appState.roomId);
        if(filteredMessages !== null && filteredMessages !== undefined){
            return filteredMessages;
        }
        return [];
    }

    console.log(`Messages ::::: ${messages?.docs[0].data()['channelID']}`);
    console.log(`ROOMS::: ${roomDetails?.empty}`);
    
        useEffect(()=>{
            chatRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }, [appState.roomId, loading]);

  return (
    <ChatContainer>

        {
            (appState.roomId && roomMessages().length >0 ) ? (<>
                <ChatHeader>
                     <ChatHeaderLeft>
                         <h4> <strong>#{appState.roomName}</strong> </h4>
                         <StarOutlineOutlinedIcon/>
                     </ChatHeaderLeft>
         
                     <ChatHeaderRight>
                         <p>
                             <InfoOutlinedIcon/> Details
                         </p>
                     </ChatHeaderRight>
                 </ChatHeader>
                 
                 <ChatMessages>
         
                     {
                     roomMessages().map((e)=>{
                         const data= e.data();
                         return (
                             <Message message={data['message']} sender={data['user']} senderAvatar={data['userImage']} />
                         );
                     })
                     }
                     <ChatInput channelID={appState.roomId} channelName={appState.roomName} chatRef={chatRef}/>
                     <ChatBottom ref={chatRef}/>
                 </ChatMessages>
                </>) : (
                    <ChatEmpty>
                        <h2>
                            No Channel Selected 🥲
                        </h2>
                    </ChatEmpty>
                )
        }
       
        
        
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


const ChatBottom = styled.div`
 padding-bottom: 200px;
`;


const ChatEmpty = styled.div`
padding: 200px;


`;