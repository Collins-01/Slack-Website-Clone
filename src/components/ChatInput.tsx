import { Button } from '@mui/material';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import React, {  useState, MouseEvent } from 'react'
import styled from 'styled-components';
import { auth, db } from '../firebase_app';
import {v4 as uuidv4} from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';


interface ChatInputProps{
    channelName: string;
    channelID : string | null;
}

function ChatInput(props: ChatInputProps) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState<string>('');
    const sendMessage = async(event: MouseEvent<HTMLButtonElement> )=>{
        event.preventDefault();
        try {
            // if(!props.channelID) {
            //     return;
            // }
            const collectionRef = collection(db,"ROOMS" ,`${props.channelID}` , "MESSAGES" ,`${uuidv4()}`);
           const response = await addDoc(collectionRef, {
                message: input,
                user:  user?.displayName ??'',
                timestamp: serverTimestamp(),
                userImage: user?.photoURL 
            });
            console.log(`Response PATH::::::   ${response.path}`)
            console.log(`Response ID::::::   ${response.id}`)
    
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


