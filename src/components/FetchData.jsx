import React, { useEffect, useState } from 'react';

const FetchData = () => {
  const [allTestInfo, setAllTestInfo] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function checkTokenExpiration() {
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
    const token = localStorage.getItem("token");

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
        try {
          const myHeaders = {
            "Content-Type": "application/json",
          };
    
          const data = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
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
          localStorage.setItem("token", result.access_token);
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

      <div className="bg-[#222831] min-h-screen flex flex-col w-full w-screen-lg justify-start items-center overflow-y-auto">
      <div className='bg-[#222831] flex m-5 flex-row top-0 '>
        
      <button className="top-0 m-2 font-bold text-[#EEEEEE] bg-[#3D8B3D] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#2E6B2E] hover:scale-105 transition-transform duration-300" onClick={fetchDataButton}>
          Fetch Data
      </button>        
      <button className="top-0 m-2 font-bold text-[#EEEEEE] bg-[#D9534F] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#C14440] hover:scale-105 transition-transform duration-300" onClick={clearData}>
        Log Out
      </button>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      {allTestInfo && allTestInfo.map((info, index) => (
        <div key={index} className="p-5 m-5 shadow-2xl shadow-black  rounded bg-[#31363F]">
          <p className='mb-2'>
            <span className="text-[#EEEEEE] text-2xl">Name: </span>
            <span className="text-[#76ABAE] text-2xl">{info.name}</span>
          </p>
       
          <p>
            <span className="text-[#EEEEEE]">Test Number: </span>
            <span className="text-[#76ABAE] text-xl">{info.testNum}</span>
          </p>
          <p className="text-[#EEEEEE]"> {info.result}</p>
          <p className='mb-2'>
            <span className="text-[#EEEEEE]">Test Result: </span>
            <span className="text-[#76ABAE]">{info.result}</span>
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