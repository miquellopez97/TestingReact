import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
//TODO: Libreria Helper Tokens https://www.youtube.com/results?search_query=token+helper+react
import { urlApi } from "../assets/utils/global";
import { getToken, setToken, deleteToken, setTokenRefresh, getTokenRefresh, deleteTokenRefresh } from "../assets/utils/helper";

const UserContext = React.createContext();


export function UserProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [hotelDetail, setHotelDetail] = useState(null);

  async function login(oForm) {
    try {
      const {data} = await axios.post(urlApi + "login", oForm);//Preguntar si esto es una peticion normal de axios

      setToken(data.body.token);//Como acceder a estos params con la API de uri
      setTokenRefresh(data.body.tokenRefresh);//Como acceder a estos params con la API de uri

      const config = {
        headers: { Authorization: `Bearer ${data.body.token}` }//Como acceder a estos params con la API de uri
      };

      const {data: userData} = await axios.get(urlApi + "userDetailByToken/" +data.body.tokenRefresh,config);//Esto que hace?
      setUserInfo(userData.body);

      return true;
    } catch (error) {
        if(error){
            return error.response
        }else{
            return true
        }
    }
  }

  async function signUpRegister(oUserInfo) {
    try {
        const {data} = await axios.post(urlApi + "/user", oUserInfo);
  
        setUserInfo(data[0]);

        setToken(data[1].token);

        return true;
      } catch (error) {
          if(error){
            return error.response
          }else{
              return true
          }
      }
  }

  function setMyHotel (object) {
    setHotelDetail(object)
  }

  function logout() {
    setUserInfo(null);
    deleteToken();
    deleteTokenRefresh();
  }

  const value = useMemo(() => {
    return {
      userInfo,
      hotelDetail,
      signUpRegister,
      login,
      logout,
      setMyHotel
    };
  }, [userInfo, hotelDetail]);//No me digas magia

  return <UserContext.Provider value={value} {...props} />;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("Use User debe estar dentro del proveedor userContext");
  }

  return context;
}
