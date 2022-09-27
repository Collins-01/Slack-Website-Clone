import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';


export interface AppState {
  roomId: string;
  roomName: string;
  
}

const initialState: AppState = {
    roomId: '',
    roomName: ''
  
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterRoom: (state, action: PayloadAction<AppState>) => {
     state.roomId= action.payload.roomId;
     state.roomName = action.payload.roomName;
    },
    
   
  },
  
});

export const { enterRoom } = appSlice.actions;
export const selectApp = (state: RootState) => state.app;



export default appSlice.reducer;
