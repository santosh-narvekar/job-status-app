import axios from 'axios'
import {getUserFromLocalStorage} from './localstorage'

import { clearStore } from '../features/user/userSlice';

const customFetch=axios.create({
  baseURL:'https://redux-toolkit-jobster-api-server.onrender.com/api/v1'
});

// incoming response
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

// outgoing request
customFetch.interceptors.request.use((config)=>{
  const user=getUserFromLocalStorage();
  if(user){
    config.headers['Authorization'] = `Bearer ${user.token}`
  }
  return config
})
export default customFetch;
