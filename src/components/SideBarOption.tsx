import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { AppState, enterRoom } from "../features/appSlice";
import MessageService from "../services/message_service";

type SideBarOptionProps = {
  title: string;
  icon: any;
  addChannelOption: boolean | false;
  id: string | null;
  channelName?: string | null;
};
function SideBarOption(props: SideBarOptionProps) {
  const messageService = new MessageService();
  const dispatch = useAppDispatch();
  const addChannel = async () => {
    const channelName = prompt("Enter a channel name.");
    if (channelName === null) return;
    const exists = await messageService.checkIfChannelExists(channelName);

    if (exists) {
      alert(
        `Channel with name ${channelName.toLowerCase()} already exists in database.`
      );
      return;
    }
    const response = await messageService.createChannel(channelName);
    if (response.success) {
      return;
    }
    if (!response.success) {
      alert(response.message);
    }
  };
  const selectChannel = () => {
    if (props.id) {
      const appState: AppState = {
        roomId: props.id,
        roomName: props.channelName ?? "",
      };
      dispatch(enterRoom(appState));
    }
  };
  return (
    <SideBarOptionContainer
      onClick={props.addChannelOption ? addChannel : selectChannel}
    >
      {props.icon && props.icon}
      {props.icon ? (
        <h3>{props.title}</h3>
      ) : (
        <SideBarOptionChannel>
          <span>#</span> {props.title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionContainer>
  );
}

export default SideBarOption;

const SideBarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SideBarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
