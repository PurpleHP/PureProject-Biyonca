import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';


const FetchData = () => {
  const [allTestInfo, setAllTestInfo] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const decryptPassword = (encryptedPassword) => {
    const key = import.meta.env.VITE_ENCRYPTION_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  };

  const checkTokenExpiration = () => {
    let isTokenExpired = false;
    const tokenValue = localStorage.getItem("tokenExpiration");
    if (tokenValue) {
        const expirationDate = new Date(tokenValue);
        const currentDate = new Date();

        isTokenExpired =  expirationDate.getTime() < currentDate.getTime();
    }
    else{
        isTokenExpired = true;
    }
    setIsTokenExpired(isTokenExpired);
  }


  const fetchData = () => {
    
    const token = decryptPassword(localStorage.getItem("token"));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Add Bearer token to the Authorization header

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:8888/v1/testInfo/find_all", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const crucialInfo = result.map(info => ({
          name: info.name,
          created: info.created,
          testNum: info.testNum,
          result: info.result,

        }));
        setAllTestInfo(crucialInfo);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    checkTokenExpiration();
    fetchData();
  }, []);
  


  setInterval(() => {
    checkTokenExpiration();
  } , 300000); //5 dakikada bir kontrol et

  useEffect( () => {
    async function checkCookieExpiration() {
      if(isTokenExpired){
        const encryptedPassword = localStorage.getItem('password');
        const decryptedPassword = decryptPassword(encryptedPassword);

        try {
          const myHeaders = {
            "Content-Type": "application/json",
          };
    
          const data = {
            username: localStorage.getItem("username"),
            password: decryptedPassword
          };
    
          const response = await fetch("http://localhost:8888/security/login", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
          });
    
          const result = await response.json();
          let currentDate = new Date()
          let expirationDate = new Date()
          expirationDate.setTime(currentDate.getTime() +  (50 * 60 * 1000));
          const key = import.meta.env.VITE_ENCRYPTION_KEY;
          const encrptedToken = CryptoJS.AES.encrypt(result.access_token, key).toString();
          localStorage.setItem("token", encrptedToken);
          localStorage.setItem("tokenExpiration", expirationDate);
        } catch (error) {
          console.error(error);
        }
      }
    }
    checkCookieExpiration();

  }
  , [isTokenExpired]);

  const fetchDataButton = () => {
    fetchData();
  }

  const clearData = () => {
    setShowConfirmation(true);
  }

  const handleLogout = () => {
    setAllTestInfo(null);
    setShowConfirmation(false);
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <div className="bg-[#222831] min-h-screen flex flex-col w-full justify-start items-center overflow-y-auto">
    <div className="bg-[#222831] flex flex-row fixed items-center justify-center top-0 left-0 w-full z-50 p-4">
      <button className="m-2 font-bold text-[#EEEEEE] bg-[#31363F] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#292d35] hover:scale-105 transition-transform duration-300" onClick={fetchDataButton}>
        Filter
      </button>
      <button className="m-2 font-bold text-[#EEEEEE] bg-[#3D8B3D] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#2E6B2E] hover:scale-105 transition-transform duration-300" onClick={fetchDataButton}>
        View All Results
      </button>
      <button className="m-2 font-bold text-[#EEEEEE] bg-[#D9534F] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#C14440] hover:scale-105 transition-transform duration-300" onClick={clearData}>
        Log Out
      </button>
    </div>

    <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-5">
    {allTestInfo && allTestInfo.map((info, index) => (
        <div key={index} className="p-5 m-5 shadow-2xl shadow-black rounded bg-[#31363F]">
          <p className='mb-2'>
            <span className="text-[#EEEEEE] text-2xl">Name: </span>
            <span className="text-[#76ABAE] text-2xl">{info.name}</span>
          </p>
       
          <p className='mb-1'>
            <span className="text-[#EEEEEE] text-xl">Test Number: </span>
            <span className="text-[#76ABAE] text-xl">{info.testNum}</span>
          </p>
          <p className="text-[#EEEEEE]"> {info.result}</p>
          <p className='mb-2'>
            <span className="text-[#EEEEEE] text-xl">Test Result: </span>
            <span className="text-[#76ABAE] text-xl">{info.result}</span>
          </p>
          <p>
            <span className="text-[#EEEEEE]">Date: </span>
            <span className="text-[#76ABAE]">{info.created}</span>
          </p>
        </div>
      ))}
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#31363F] p-6 rounded-lg shadow-md">
            <p className="text-[#EEEEEE] mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
            <button
                onClick={() => setShowConfirmation(false)}

                className="bg-[#D9534F] text-[#EEEEEE] p-2 mr-2 rounded hover:bg-[#b14440] hover:scale-105 transition-transform duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#3D8B3D] text-[#EEEEEE] p-2 rounded ml-2 hover:bg-[#2E6B2E] hover:scale-105 transition-transform duration-300"
              >
                Confirm
              </button>
          
            </div>
          </div>
        </div>
      )}

    </div>
    
  );
}

export default FetchData;