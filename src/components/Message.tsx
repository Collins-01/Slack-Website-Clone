import React from 'react'
import styled from 'styled-components';
import {Timestamp} from 'firebase/firestore';

interface MessageProps {
    message: string;
    sender: string;
    senderAvatar: string;
    timestamp: number 
}
function Message(props:MessageProps) {
  return (
    <MessageContainer>
        <img src={props.senderAvatar} alt=''/>
        <MessageInfo>
            <h4>{props.sender}{' '}
            <span>
                {new Date(props.timestamp * 1000).toUTCString()}
            </span>
             </h4>
             <p>{props.message}</p>
        </MessageInfo>
    </MessageContainer>
  )
}

export default Message;



const MessageContainer = styled.div`
display: flex;
align-items: center;
padding: 20px;
 >img {
  height: 50px;
  width: 50px;
  border-radius: 5px;

 }
`;
const MessageInfo = styled.div`
padding-left: 10px;
>h4 > span{ 
  color: gray;
  font-weight: 300;
  margin-left: 4px;
  font-size: 10px;
}
`;