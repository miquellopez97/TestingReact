import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { invalidCredentials, parseBackendError, userNotFound } from "../../assets/utils/helper";
import { useUser } from "../../context/UserContextNew";

function Component() {
    const emailInputRef = useRef();
    const pwdInputRef = useRef();
    const navigate = useNavigate();

    const [errorInputs, setErrorInputs] = useState(false); //Saber si estan mal los imputs

    const userLoged = () => {navigate('/home')}; //Navegar a la home si esta loged

    const {login} = useUser();

    const handleLogin = async (event) => {
        event.preventDefault();
        if(validateForm(emailInputRef.current.value, pwdInputRef.current.value)){
            try{
                const response = await login({
                    mail: emailInputRef.current.value,
                    password: pwdInputRef.current.value,
                });
    
                if(response === true){
                    userLoged();
                } else {
                    userNotFound()
                }
            } catch(error){
                parseBackendError(error);
            }
        }
    };

    //Validador email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    //Validar email y password
    const validateForm = (email, pwd) => {
        const emailValidation = validateEmail(email);
        const pwdValidation = new RegExp('^[0-9a-zA-Z]{5,}$');
        const pwdToValidate = pwd.replace(/ /g, "");
        if (emailValidation && pwdValidation.test(pwdToValidate)){
            setErrorInputs(false);
            return true;
        } else {
            setErrorInputs(true);
            invalidCredentials();
            return false;
        }
    }

    return (
        <>
            <Form
                emailInput={emailInputRef}
                passwordInput={pwdInputRef}
                onLoginButton={handleLogin}
                onError={errorInputs}
            />
        </>
    );
}
export default Component;
