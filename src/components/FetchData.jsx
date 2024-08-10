import React, { useEffect, useState } from 'react';

const FetchData = () => {
  const [allTestInfo, setAllTestInfo] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);


  function checkTokenExpiration() {
    let isTokenExpired = false;
    const tokenValue = localStorage.getItem("tokenExpiration");
    if (tokenValue) {
        const expirationDate = new Date(tokenValue);
        const currentDate = new Date();

        isTokenExpired =  expirationDate.getTime() < currentDate.getTime();
        // console.log(expirationDate)
        // console.log(currentDate)
        // console.log(isTokenExpired)
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
    setAllTestInfo(null);
  }


  return (

      <div className="bg-[#222831] min-h-screen flex flex-col w-full w-screen-lg justify-start items-center overflow-y-auto">
      <div className='bg-[#222831] flex m-5 flex-row top-0 '>
        
        <button className="top-0 m-2 text-[#EEEEEE] bg-[#76ABAE] rounded-lg p-4 hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300" onClick={fetchDataButton}>Fetch Data</button>
        <button className="top-0 m-2 text-[#EEEEEE] bg-[#76ABAE] rounded-lg p-4 hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300" onClick={clearData}>Clear Data</button>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      {allTestInfo && allTestInfo.map((info, index) => (
        <div key={index} className="p-5 m-5 border rounded bg-[#31363F]">
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
    </div>
    
  );
}

export default FetchData;