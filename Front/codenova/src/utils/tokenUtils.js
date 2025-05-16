import { getSessionKey } from "../api/apiEncrytionApi";

export const getAccessToken = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
  
    return cookies.accessToken || null;
  };
  