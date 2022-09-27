import React from 'react'
import styled from 'styled-components';
import {useCollection} from 'react-firebase-hooks/firestore';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebase_app';
import { useAppDispatch } from '../app/hooks';
import { AppState, enterRoom } from '../features/appSlice';



type SideBarOptionProps={
    title: string;
    icon: any;
    addChannelOption: boolean | false; 
    id: string | null;
    channelName: string | null
}
function SideBarOption(props: SideBarOptionProps) {
    const dispatch = useAppDispatch();
    const [channels, loading, error] = useCollection(collection(db, "ROOMS"))
    const addChannel = ()=>{
        const channelName = prompt('Enter a channel name.')
        if(channelName){
    const collectionRef =  collection(db, "ROOMS");
            addDoc(collectionRef, {
                name: channelName
            })
        }
    }
    const selectChannel = ()=>{
        if(props.id){
            const appState: AppState = {
                roomId: props.id,
                roomName: props.channelName ?? '',
            }
         dispatch(enterRoom(appState))
        }
    }
  return (
    <SideBarOptionContainer onClick={ props.addChannelOption ? addChannel: selectChannel }>
            {props.icon && props.icon}
            {
                props.icon ? (<h3>{props.title}</h3>) : (<SideBarOptionChannel>
                    <span>#</span> {props.title}
                </SideBarOptionChannel>)
            }
    </SideBarOptionContainer>
  )
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

    >h3 {
        font-weight: 500;
    }

    >h3 > span { 
        padding: 15px;

    }

`;

const SideBarOptionChannel = styled.h3`
        padding: 10px 0;
        font-weight: 300;
`;