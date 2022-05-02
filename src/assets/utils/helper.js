import Axios  from "axios";
import Swal from "sweetalert2";

const REFRESH_TOKEN_KEY = 'BOOKING_REFRESH_TOKEN';

export function setToken(token){
    localStorage.setItem('BOOKING_TOKEN',token);
}

export function getToken(){
    return localStorage.getItem('BOOKING_TOKEN');
}

export function deleteToken(){
    localStorage.removeItem('BOOKING_TOKEN');
}

export function setTokenRefresh(token){
    localStorage.setItem('BOOKING_REFRESH_TOKEN',token);
}

export function getTokenRefresh(){
    return localStorage.getItem('BOOKING_REFRESH_TOKEN');
}

export function deleteTokenRefresh(){
    localStorage.removeItem('BOOKING_REFRESH_TOKEN');
}

export function initAxiosInterceptors() {
    Axios.interceptors.request.use(function(config) {
        const token = getToken();

        if (token) {
            config.headers.Authoritzation = `Bearer ${token}`
        }

        return config
    });

    Axios.interceptors.response.use(function(response){
        return response
    }, function(error) {

        if(error.response.status === 401){
            console.log('Error: '+ error.response.status)
        }
        return Promise.reject(error)

    })
}

export function parseDateJs(sDate){
    const splittedDate = sDate.split("T");
    return splittedDate[0];
}

export function parseBackendError(response){

      switch (response.status) {
          case 404:
              return (Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No existe este usuario',
              }));
              case 401:
                  return(Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No está autorizado',
                  }));
            case 422:
                if(response.data.errors.email[0] === "The email has already been taken."){
                    return(Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El Email ya existe',
                      }));
                }else{
                    return(Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Los datos introducidos són incorrectos',
                      }));
                }
                
            case 500:
                return(Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en el servidor',
                  }));
          default:
              return(Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error no esperado',
              }))
      }
}

export function showSuccessCreated(){
    return(Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'The Hotel has been created'
    }))
}

export function userNotFound(){
    return(Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'User wrong email or wrong password'
    }))
}

export function invalidCredentials(){
    return(Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Parametros erroneos'
    }))
}

export function showSuccessUpdated(){
    return(Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'The Hotel has been updated'
    }))
}

export function wait(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
  }