import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { Range } from 'react-range';


const FetchData = () => {
  const maxVal = 1000000;
  const minVal = 1;
  const [allTestInfo, setAllTestInfo] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Slider ----------------------
   const [values, setValues] = useState([minVal, maxVal]); // Initial range values

  const handleApplyFilter = () => {
    const testName = document.getElementById('testName').value;
    const testResult = document.getElementById('testResult').value;
    const testStartDate = document.getElementById('testStartDate').value;
    const testEndDate = document.getElementById('testEndDate').value;

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

        const filteredInfo = crucialInfo.filter(info => {
          if (testName !== "" && info.name !== testName) return false;
          if (testResult !== "" && info.result !== testResult) return false;
          if (testStartDate !== "" && info.created < new Date(testStartDate)) return false;
          if (testEndDate !== "" && info.created > new Date(testEndDate)) return false;
          if (info.testNum < values[0] || info.testNum > values[1]) return false;
          if (info.created < testStartDate || info.created > testEndDate) return false;
          console.log("Date:" ,info.created, "Start Date:", testStartDate, "End Date:", testEndDate);
          return true;
        });
        if(filteredInfo.length === 0){
          alert("NO TEST RESULTS FOUND!");
          setAllTestInfo(crucialInfo);
        }
        else{
          setAllTestInfo(filteredInfo);

        }
      })
      .catch((error) => console.error(error));

    setShowFilter(false);
  };

  const handleInputChange = (index, value) => {
    const newValue = Math.max(minVal, Math.min(maxVal, value)); // Ensure value is within range
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };
    // Slider ----------------------

  // Date Picker ----------------------
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate > endDate) {
      setEndDate(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && newEndDate < startDate) {
      setStartDate(newEndDate);
    }
  };
  // Date Picker ----------------------


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

  const filterOptions = () => {
    setShowFilter(true);
  }

  return (

    <div className="bg-[#222831] min-h-screen flex flex-col w-full justify-start items-center overflow-y-auto">
        <div className="bg-[#222831] flex flex-col fixed items-center justify-center top-0 left-0 w-full z-50 p-4">
          <h className="md:text-7xl text-6xl text-[#EEEEEE] font-bold">Biyonca</h>
          <div className='pt-4'>
            <button className="m-2 font-bold text-[#EEEEEE] bg-[#31363F] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#292d35] hover:scale-105 transition-transform duration-300" onClick={filterOptions}>
              Filter
            </button>
            <button className="m-2 font-bold text-[#EEEEEE] bg-[#3D8B3D] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#2E6B2E] hover:scale-105 transition-transform duration-300" onClick={fetchDataButton}>
              View All Results
            </button>
            <button className="m-2 font-bold text-[#EEEEEE] bg-[#D9534F] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#C14440] hover:scale-105 transition-transform duration-300" onClick={clearData}>
              Log Out
            </button>
          </div>
      </div>
        

      <div className="mt-44 grid grid-cols-1 md:grid-cols-4 gap-5">
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

        {/* Logout */}

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

        {/* Filter */}

        {showFilter && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#31363F] p-6 rounded-lg shadow-md">
              <div className="flex relative flex-col justify-center items-center text-center md:w-[50vw] w-[80vw] h-[60vh]">
              <button className="absolute top-0 right-0 mt-2 ml-2 mb-2 font-bold text-[#EEEEEE] bg-[#D9534F] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#C14440] hover:scale-105 transition-transform duration-300" onClick={() => setShowFilter(false)}>
                Cancel
              </button>
              <p className="text-[#EEEEEE] absolute font-bold mt-2 p-4 top-0 md:text-3xl text-2xl mb-12">Filter Options</p>
                {/* Test Number */}
                <div className="mb-4 mt-16 w-full">
                  <p className="text-[#EEEEEE] mb-4">Test Number</p>
                  <Range
                    step={1}
                    min={minVal}
                    max={maxVal}
                    values={values}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '8px',
                          width: '100%',
                          backgroundColor: '#ccc'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, index }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '24px',
                          width: '24px',
                          backgroundColor: index === 0 ? '#3D8B3D' : '#D9534F',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  />
                  <div className="flex justify-between mt-2">
                    <div className="flex flex-col items-center">
                      <label className="text-[#EEEEEE]">Min:</label>
                      <input
                        type="number"
                        value={values[0]}
                        min={minVal}
                        max={maxVal}
                        onChange={(e) => handleInputChange(0, Number(e.target.value))}
                        className="p-2 rounded bg-[#EEEEEE] text-[#31363F] w-[2wv]"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <label className="text-[#EEEEEE]">Max:</label>
                      <input
                        type="number"
                        value={values[1]}
                        min={minVal}
                        max={maxVal}
                        onChange={(e) => handleInputChange(1, Number(e.target.value))}
                        className="p-2 rounded bg-[#EEEEEE] text-[#31363F] w-[3wv]"
                      />
                    </div>
                  </div>
                </div>
                {/* Test Number */}

                {/* Test Name */}
                <div className="mb-4 w-full flex flex-row">
                  <div className="mb-4 w-full flex flex-col">
                    <p className="text-[#EEEEEE] mb-4">Test Name</p>
                    <input 
                    id='testName'
                    className="p-2 rounded bg-[#EEEEEE] text-[#31363F] mr-2 w-full" 
                    placeholder='(Default: All)'
                  />
                  </div>
                  <div className="mb-4 w-full flex flex-col">
                    <p className="text-[#EEEEEE] mb-4">Test Result</p>
                    <input 
                    id='testResult'
                    className="p-2 rounded bg-[#EEEEEE] text-[#31363F] ml-2 w-full" 
                    placeholder='(Default: All)'
                  />
                  </div>

                </div>
                {/* Test Name */}

                {/* Date Picker */}
                <div className="mb-4 w-full flex flex-col">
                  <p className="text-[#EEEEEE] mb-4">Date Range</p>
                  <div className="mb-4 w-full flex flex-row">
                    
                      <input 
                        type="date"
                        id="testStartDate"
                        className="p-2 rounded bg-[#EEEEEE] text-[#31363F] w-full"
                        value={startDate}
                        onChange={handleStartDateChange}
                        max={endDate}
                      />
                    <p className='text-[#EEEEEE] font-extrabold p-2'>-</p>
                    <input 
                      type="date"
                      id="testEndDate"
                      className="p-2 rounded bg-[#EEEEEE] text-[#31363F] w-full"
                      value={endDate}
                      onChange={handleEndDateChange}
                      min={startDate}
                    />
                  </div>
                </div>
                {/* Date Picker */}

                <button className="m-2 font-bold text-[#EEEEEE] bg-[#3D8B3D] shadow-2xl shadow-black rounded-lg p-4 hover:bg-[#2E6B2E] hover:scale-105 transition-transform duration-300" onClick={handleApplyFilter}>
                    View Results
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default FetchData;