import { createSlice } from "@reduxjs/toolkit";

// const initialState={
    
// }
const themSlice=createSlice({
    name:"theme",

    initialState:{
        isDarkTheme:false,
        isDarkThemeActivate:false
    },
    reducers:{
        enableDarkThem:(state)=>{
            state.isDarkTheme = true
        },
        enableLightThem:state=>{
            state.isDarkTheme=false
        },
        toogleDarkThemActivate:(state)=>{
            state.isDarkThemeActivate =!state.isDarkThemeActivate
        }
    }
})
export const {enableDarkThem,enableLightThem,toogleDarkThemActivate} = themSlice.actions
export default themSlice.reducer