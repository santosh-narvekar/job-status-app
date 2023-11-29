import { useState, useEffect } from 'react';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import {useNavigate} from 'react-router-dom'
const initialState = {
  name:'',
  email:'',
  password:'',
  isMember:true,
}

const Register = () => {
  const [values,setValues]=useState(initialState);

  const {user,isLoading} = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMember=()=>{
    setValues({...values,isMember:!values.isMember}) 
  }
  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/');
      },2000)
    }
  },[user,navigate])
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // dynamic object keys
    setValues({...values,[name]:value})
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    const {name,email,password,isMember} = values;
    if(!email || !password || (!isMember && !name)){
      toast.error('Please fill out all fields');
      return;
    }
    if(isMember){
      dispatch(loginUser({email,password}))
      return;
    }
    dispatch(registerUser({name,email,password}))
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember?'Login':'Register'}</h3>
        {/* name field */}
        {!values.isMember && <FormRow
        type='text'
        name="name"
        value={values.name}
        handleChange={handleChange}
        />}
        
        {/* email  field */}
        <FormRow
        type='email'
        name="email"
        value={values.email}
        handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
        type='password'
        name="password"
        value={values.password}
        handleChange={handleChange}
        />
      <button disabled={isLoading} type='submit' className='btn btn-block'>
       {isLoading?'Loading...':'submit'}  
      </button>
     <button
     type='button'
     className='btn btn-block btn-hipster'
     disabled={isLoading}
     onClick={()=>{
      dispatch(loginUser({email:'testUser@test.com',password:'secret'}))
     }}
     >
      {isLoading?'loading...':'demo app'}
     </button>
     
      <p>{values.isMember?'Not a member yet?':'Already a member?'}
      
      <button className='member-btn' onClick={toggleMember}>
        {values.isMember?'Register':'Login'}
      </button>
      </p>
     
      </form>
      </Wrapper>
  )
}

export default Register
