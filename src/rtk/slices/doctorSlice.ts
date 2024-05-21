import { createSlice } from "@reduxjs/toolkit";


const doctorSlice=createSlice({
    name:"doctor",
    initialState:{
        doctorData:{},
    },
    reducers:{
        addDoctor:(state,action)=>{
            state.doctorData={...state.doctorData,...action.payload}
        },
        clearDoctor:(state)=>{
            state.doctorData={}
        }
    }
});

export const {addDoctor,clearDoctor}=doctorSlice.actions;
export default doctorSlice.reducer;