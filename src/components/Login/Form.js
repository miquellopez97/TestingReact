import React from "react";

function Form(props) {
  const { emailInput, passwordInput, onLoginButton, onError } = props;

  return (
    <>
      <form onSubmit={onLoginButton}>
        <input 
					type="email" 
					ref={emailInput} 
				/>
        <input 
					type="text" 
					ref={passwordInput} 
				/>
        <div className="pt-1 mb-4">
          <input 
						className="btn btn-info btn-lg btn-block"  
						type="submit" 
						value="Submit"/>
        </div>
      </form>
    </>
  );
}
export default Form;
