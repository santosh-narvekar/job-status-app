
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localstorage';
import { logoutUser } from '../user/userSlice';
import { showLoading,hideLoading,getAllJobs } from '../allJobs/allJobsSlice';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

// in redux,used to manage async operations

export const createJobs = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editTheJob = createAsyncThunk('job/editJob', editJobThunk);


const jobSlice = createSlice({
  name:'job',
  initialState,
  reducers:{
      handleChange:(state,{payload:{name,value}})=>{
        state[name]=value;
    },
    clearValues:()=>{
      return{
        // we can also return something apart from modifiying state
        ...initialState,
        jobLocation:getUserFromLocalStorage()?.location || ''
      }
    },
    editJob:(state,{payload})=>{
      return {...state,isEditing:true,...payload}
    }
  },
  
extraReducers: (builder) => {
    builder
      .addCase(createJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJobs.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Created');
      })
      .addCase(createJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editTheJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTheJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Modified...');
      })
      .addCase(editTheJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
})

export const {handleChange,clearValues,editJob}=jobSlice.actions;
export default jobSlice.reducer;