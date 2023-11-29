
import { FormRow,FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange,clearValues,createJobs} from '../../features/job/jobSlice';
import { useEffect } from 'react';
import { getUserFromLocalStorage } from '../../utils/localstorage';
import {editTheJob} from '../../features/job/jobSlice';
const AddJob = () => {
  const {user}=useSelector((store)=>store.user)
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);


  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }

    if(isEditing){
       dispatch(editTheJob({
        jobId:editJobId,
        job:{
          position,
          company,
          jobLocation,
          jobType,
          status
        }
      }))
      return;
    }
    // default functionality
    dispatch(createJobs({position,company,jobLocation,jobType,status}))
  };
  
  useEffect(()=>{
    if(!isEditing){
      dispatch(handleChange({
        name:'jobLocation',
        value:user.location
      }))
    }
  },[])
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // set as a object bcz order becomes irrelavant
    dispatch(handleChange({name,value}));
  };
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing?'edit job ':'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
          type="text"
          name="position"
          value={position}
          handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
           <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
         {/* status */}
         <FormRowSelect
         name='status'
         value={status}
         id='status'
         handleChange={handleJobInput}
         list={statusOptions}
         />
         {/* */}
         <FormRowSelect
          name='jobType'
          labelText='job type'
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
/>
         <div className='btn-container'>
          {/* type important if button inside a form */}
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button type="submit"
            className='btn btn-clock submit-btn'
            onClick={handleSubmit}
            disabled={isLoading}>
              submit
            </button>
        </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
