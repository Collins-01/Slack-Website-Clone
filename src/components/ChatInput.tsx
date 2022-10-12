import { Button } from "@mui/material";
import React, { useState, MutableRefObject } from "react";
import styled from "styled-components";
import { auth } from "../firebase_app";
import { useAuthState } from "react-firebase-hooks/auth";
import MessageService from "../services/message_service";

interface ChatInputProps {
  channelName: string;
  channelID: string | null;
  chatRef: MutableRefObject<HTMLDivElement | null>;
}

function ChatInput(props: ChatInputProps) {
  const messageService = new MessageService();
  const [user] = useAuthState(auth);
  const [input, setInput] = useState<string>("");
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (input.length > 0) {
      const res = await messageService.sendMessage(
        props.channelID ?? "",
        input,
        props.channelName,
        user
      );
      if (res.success) {
        setInput("");
        return;
      } else {
        alert(res.message);
      }
    }
    return;
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={`Message #${props.channelName}`}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
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
