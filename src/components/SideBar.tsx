import React from 'react'
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import SideBarOption from './SideBarOption';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { auth, db } from '../firebase_app';
import { useAuthState } from 'react-firebase-hooks/auth';
function SideBar() {
    const [user] = useAuthState(auth);
    const [channels, loading, error] = useCollection(collection(db, "ROOMS"));
  return (
    <SideBarContainer>
        <SideBarHeader>
            <SideBarInfo>
                <h2>
                    HALOGENS
                </h2>
                <h3>
                    <FiberManualRecordIcon/>
                    {user?.displayName}
                </h3>
            </SideBarInfo>
            <CreateIcon/>
        </SideBarHeader>
        <SideBarOption icon={<InsertCommentIcon fontSize='small' style={{padding : 10}}/>} title='Threads' addChannelOption={false} id='01' />
        <SideBarOption icon={<InboxIcon fontSize='small' style={{padding : 10}} />} title='Mentions & Reactions' addChannelOption={false}  id='02'/>
        <SideBarOption icon={<DraftsIcon fontSize='small' style={{padding : 10}} />} title='Saved Items' addChannelOption={false}  id='03' />
        <SideBarOption icon={<PeopleAltIcon fontSize='small' style={{padding : 10}} />} title='Channel Browser' addChannelOption={false}  id='04' />
        <SideBarOption icon={<BookmarkBorderIcon fontSize='small' style={{padding : 10}} />} title='People & user groups' addChannelOption={false} id='05' />
        <SideBarOption icon={<AppsIcon fontSize='small' style={{padding : 10}} />} title='Apps' addChannelOption={false} id='06' />
        <SideBarOption icon={<FileCopyIcon fontSize='small' style={{padding : 10}} />} title='File browser' addChannelOption={false}  id='07'/>
        <SideBarOption icon={<ExpandLessIcon fontSize='small' style={{padding : 10}} />} title='show less' addChannelOption={false} id='08' />
        <hr/>
        <SideBarOption icon={<ExpandMoreIcon fontSize='small' style={{padding : 10}} />} title='Channels' addChannelOption={false} id='09' /> 
        <hr/>
        <SideBarOption icon={<AddIcon fontSize='small' style={{padding : 10}} />} title='Add' addChannelOption={true} id='010'/> 

        {
            channels?.docs.map((e)=>{
                // console.log(e.data());
                return (<SideBarOption addChannelOption={false} title={`${e.data()['name']}`.toUpperCase()} icon={null}  key={e.id} id={e.id} />)
            }
            
            )
        }
    </SideBarContainer> 
  )
}

export default SideBar;



const SideBarContainer = styled.div`
background-color: var(--slack-color);
color: white;
flex: 0.3;
border-top: 1px solid #49274b;
max-width: 260px;
margin-top: 60px;

>hr {
    margin-top : 10px;
    margin-bottom : 10px;
    border: 1px solid #49274b;
    
}


`;

const SideBarHeader = styled.div`
    display: flex;
    padding-bottom: 1px solid #49274b;
    padding: 13px;
    > .MuiSvgIcon-root { 
        padding: 8px;
        color : #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;

    }
`;

const SideBarInfo = styled.div`
   flex: 1px;
   >h2 {
    
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
   }
   >h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
   }
   >h3 > .MuiSvgIcon-root { 
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
   }
`;