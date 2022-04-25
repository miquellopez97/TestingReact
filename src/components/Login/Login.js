import {useRef, useState} from 'react';
import useHttp from '../../hooks/useHttp';
import { useNavigate } from "react-router-dom";

function Login() {

  const [isLoged, setIsLoged] = useState(false);

  const userEmailInput = useRef();
  const userPwdInput = useRef();

  const userLoged = () => setIsLoged(true);

  const {isLoading, error, sendRequest: loginUser} = useHttp();

  const navigate = useNavigate();
  const goToHome = () => {navigate('/')};

  const submitHandler = async (event) => {
    event.preventDefault();

    const user = {
      mail: userEmailInput.current.value,
      password: userPwdInput.current.value,
    }

    const response = await loginUser(
      {
        url: 'https://daw-m07-uf4-pr01.herokuapp.com/api/v1/auth/login',
        method: 'post',
        body: user,
      },

      userLoged
    );

    //Falta catch de como ha ido la peticion

    if(response === undefined){
      goToHome();
    }
  }

  let content = '';
  if (isLoged) content = <p>User is Loged!</p>;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading ...</p>;

  return (
    <>
      {content}
      <form onSubmit={submitHandler}>
        <input type="text" ref={userEmailInput}/>
        <input type="text" ref={userPwdInput}/>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login;