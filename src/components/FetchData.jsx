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

  return (
    <div className="fixed top-0 bg-[#0B090A] flex flex-col w-screen h-screen justify-center items-center overflow-y-auto">
      <button className="top-0 text-white border-2 rounded-lg p-4" onClick={fetchData}>Fetch Data</button>
      <div className="text-white max-w-screen break-words">
        {allTestInfo && allTestInfo.map((info, index) => (
          <div key={index} className="p-5 m-5 border border-white rounded">
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