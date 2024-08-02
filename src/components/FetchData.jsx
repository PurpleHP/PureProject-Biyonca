import React, { useState } from 'react';

const FetchData = () => {
  const [allTestInfo, setAllTestInfo] = useState(null);

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
          id: info.id,
          name: info.name,
          created: info.created,
          testNum: info.testNum,
          ownerName: info.owner.name,
          ownerEmail: info.owner.email,
          locationName: info.location.name,
          locationLatitude: info.location.latitude,
          locationLongitude: info.location.longitude,
          lastCropType: info.location.lastCropType,
          currentCropType: info.location.currentCropType,
          nextCropType: info.location.nextCropType
        }));
        setAllTestInfo(crucialInfo);
        console.log(crucialInfo);
      })
      .catch((error) => console.error(error));
  }

  const addData = () => {
    //goes to /addData
    window.location.href = "/addData";
  }

  return (
    <div className="mt-5 bg-[#F3F4F6] flex flex-col w-full w-screen-lg justify-center items-center overflow-y-auto">
      <div className='flex flex-row'>
      <button className="top-0 m-2 text-white bg-[#10B981] rounded-lg p-4 hover:bg-[#059669]" onClick={fetchData}>Fetch Data</button>
      <button className="top-0 m-2 text-white bg-[#F59E0B] rounded-lg p-4 hover:bg-[#D97706]" onClick={addData}>Add Data</button>      </div>


          <div className="text-[#1E3A8A] max-w-screen break-words">
          {allTestInfo && allTestInfo.map((info, index) => (
            <div key={index} className="p-5 m-5 border border-[#1E3A8A] rounded bg-white">
              <p>ID: {info.id}</p>
              <p>Name: {info.name}</p>
              <p>Created: {info.created}</p>
              <p>Test Number: {info.testNum}</p>
              <p>Owner Name: {info.ownerName}</p>
              <p>Owner Email: {info.ownerEmail}</p>
              <p>Location Name: {info.locationName}</p>
              <p>Latitude: {info.locationLatitude}</p>
              <p>Longitude: {info.locationLongitude}</p>
              <p>Last Crop Type: {info.lastCropType}</p>
              <p>Current Crop Type: {info.currentCropType}</p>
              <p>Next Crop Type: {info.nextCropType}</p>
            </div>
          ))}
        </div>
      </div>
  );
}

export default FetchData;