import {useRef, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from 'axios';
import UserContext from '../../context/UserContext';

function Login() {

  const userEmailInput = useRef();
  const userPwdInput = useRef();

  const actualUser = useContext(UserContext);

  const navigate = useNavigate();
  const goToHome = () => {navigate('/home')};

  const submitHandler = async (event) => {
    event.preventDefault();

    const user = {
      mail: userEmailInput.current.value,
      password: userPwdInput.current.value,
    };

    axios.post('https://daw-m07-uf4-pr01.herokuapp.com/api/v1/auth/login', user)
      .then(res => {
        if(res.status === 200){
            actualUser.setToken(res.data.body.accessToken);
            goToHome();
          }
      }).catch(err => {
        console.log(err);
      });
  };


  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" ref={userEmailInput}/>
        <input type="text" ref={userPwdInput}/>
        <div className="pt-1 mb-4">
          <input 
						type="submit" 
						value="Submit"/>
        </div>
      </form>
    </>
  )
}

export default Login;