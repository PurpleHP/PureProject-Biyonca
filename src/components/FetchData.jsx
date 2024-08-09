import React, { useEffect, useState } from 'react';
import cookieExpired from './CookieCheck';

const FetchData = () => {
  const [allTestInfo, setAllTestInfo] = useState(null);
  const [notExpired, setNotExpired] = useState(true);

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
  }


  setInterval(() => {
    const {notExpired} = cookieExpired();
    setNotExpired(notExpired);
  } , 300000); //5 dakikada bir kontrol et

  useEffect( () => {
    async function checkCookieExpiration() {
      if(!notExpired){
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
          const expires = new Date(Date.now() + 5 * 1000).toUTCString(); //cookie expires in 50 minutes
          localStorage.setItem("token", result.access_token);
          localStorage.setItem("tokenExpiration", expires);
        } catch (error) {
          console.error(error);
        }
      }
    }
    checkCookieExpiration();

  }
  , [notExpired]);

  return (

      <div className="bg-[#222831] min-h-screen flex flex-col w-full w-screen-lg justify-start items-center overflow-y-auto">
      <div className='bg-[#222831] flex m-5 flex-row top-0 '>
        <button className="top-0 m-2 text-[#EEEEEE] bg-[#76ABAE] rounded-lg p-4 hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300" onClick={fetchData}>Fetch Data</button>
      </div>

      <div className="text-[#EEEEEE] max-w-screen break-words bg-[#222831]">
        {allTestInfo && allTestInfo.map((info, index) => (
          <div key={index} className="p-5 m-5 border rounded bg-[#31363F]">
            <p>Name: {info.name}</p>
            <p>Date: {info.created}</p>
            <p>Test Number: {info.testNum}</p>
            <p>Test Result: {info.result}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default FetchData;