import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (inputs)=>{
        try {
            const res = await axios.post('/api/localaccounts/login', inputs, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            localStorage.setItem('user', JSON.stringify(res.data.user))
            alert(res.data.message)
            console.log(res.data['user'])
            return (res.data['user'])
        } catch (err) {
            console.log(err.response.data.error)
            throw new Error (err.response.data.error)
        }
})

export const loginGoogle = createAsyncThunk(
    'user/loginGoogle',
    async (inputs)=>{
        try {
            const res = await axios.post('/api/googleaccounts/login', inputs, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            localStorage.setItem('user', JSON.stringify(res.data.user))
            alert(res.data.message)
            console.log(res.data['user'])
            return (res.data['user'])
        } catch (err) {
            if (err.response.data.emailDoesNotExist){ 
                alert(err.response.data.error)
                throw new Error (err.response.data.error)
                //return (err.response.data.emailDoesNotExist)
            }
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async()=>{
        try {
            const res = await axios.get('/api/logout')
            localStorage.removeItem('user')
            alert(res.data.message)
        } catch(err){
            console.log(err.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user', 
    initialState: {
        loading: false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        error: null
    }, 
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true
            state.user = null
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false
            //console.log('payload: ' + JSON.stringify(action.payload))
            state.user = JSON.stringify(action.payload)
            state.error = null
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading = false
            state.user = null
            console.log(action.error.message)
            state.error = action.error.message
        })
        .addCase(loginGoogle.pending, (state)=>{
            state.loading = true
            state.user = null
            state.error = null
        })
        .addCase(loginGoogle.fulfilled, (state, action)=>{
            state.loading = false
            //console.log('payload: ' + JSON.stringify(action.payload))
            state.user = JSON.stringify(action.payload)
            state.error = null
        })
        .addCase(loginGoogle.rejected, (state, action)=>{
            state.loading = false
            state.user = null
            //console.log(action.error.message)
            state.error = action.error.message
        })
        .addCase(logoutUser.fulfilled, (state)=>{
            state.loading = false
            state.user = null
            state.error = null
        })
    }
})

export default userSlice.reducer