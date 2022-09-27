import { Button } from '@mui/material';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import React, {  useState, MouseEvent, MutableRefObject } from 'react'
import styled from 'styled-components';
import { auth, db } from '../firebase_app';
import {v4 as uuidv4} from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DB } from '../constants';


interface ChatInputProps{
    channelName: string;
    channelID : string | null;
    chatRef: MutableRefObject<HTMLDivElement | null>
}

function ChatInput(props: ChatInputProps) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState<string>('');
    const sendMessage = async(event: MouseEvent<HTMLButtonElement> )=>{
        event.preventDefault();
        try {
            const ref = collection(db, `${DB.messages}`)
           const response = await addDoc(ref, {
                channelID : props.channelID,
                message: input,
                user:  user?.displayName ??'',
                timestamp: serverTimestamp(),
                userImage: user?.photoURL 
            });
            props.chatRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
    
            setInput('')
        } catch (error) {
            console.log(`Error Sending Message ::::::: ${error}`)
        }
    }
  return (
    <ChatInputContainer>
        <form >
            <input  placeholder={`Message #HALOGENS`}  onChange={(e)=>setInput(e.target.value)} value={input}/>
            <Button type='submit' onClick={sendMessage} >SEND</Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput;


const ChatInputContainer = styled.div`
 border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
   > form > input { 
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;  
    padding: 20px;
    outline: none;
   }

   > form > button { 
    display: none !important;
   }
`;





// https://stackoverflow.com/questions/68987326/firestore-whats-the-pattern-for-adding-new-data-in-web-v9


