import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isDarkTheme:false
}
const themSlice=createSlice({
    name:"theme",

    initialState,
    reducers:{
        enableDarkThem:(state)=>{
            state.isDarkTheme = true
        },
        enableLightThem:state=>{
            state.isDarkTheme=false
        }
        
    }
})
export const {enableDarkThem,enableLightThem} = themSlice.actions
export default themSlice.reducer