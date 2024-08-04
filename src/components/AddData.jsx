import React, { useState } from 'react';
import CookieCheck from './CookieCheck';

const FetchData = () => {
  const [formData, setFormData] = useState({
    name: '',
    created: new Date(),
    result: '',
    testNum: 0,
    owner: {
      id: null,
      name: '',
      email: '',
      created: null,
      username: '',
      password: '',
      authorities: null
    },
    location: {
      id: '',
      name: '',
      latitude: '',
      longitude: '',
      lastCropType: '',
      currentCropType: '',
      nextCropType: '',
      created: '',
      owner: {
        id: '',
        name: '',
        email: '',
        created: '',
        username: '',
        password: '',
        authorities: ''
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else if (keys.length === 2) {
      if (keys[0] === 'owner') {
        setFormData({
          ...formData,
          owner: { ...formData.owner, [keys[1]]: value },
          location: {
            ...formData.location,
            owner: { ...formData.location.owner, [keys[1]]: value }
          }
        });
      } else {
        setFormData({ ...formData, [keys[0]]: { ...formData[keys[0]], [keys[1]]: value } });
      }
    } else if (keys.length === 3) {
      setFormData({
        ...formData,
        [keys[0]]: {
          ...formData[keys[0]],
          [keys[1]]: { ...formData[keys[0]][keys[1]], [keys[2]]: value }
        }
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.location.owner = formData.owner;

    try {
      const token = localStorage.getItem("token");
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`); // Add Bearer token to the Authorization header
  
      const raw = JSON.stringify(formData, null, 2)
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("http://localhost:8888/v1/testInfo/save", requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      alert("Data added successfully");

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-[#222831] min-h-screen flex justify-center items-center overflow-y-auto p-4'>
  <div className="mt-5 bg-[#222831] flex flex-col w-full max-w-screen-lg justify-center items-center overflow-y-auto">
    <form onSubmit={handleSubmit} className="bg-[#31363F] p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl mb-4 text-[#EEEEEE]">Fill in the Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Result</label>
          <input type="text" name="result" value={formData.result} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Test Number</label>
          <input type="number" name="testNum" value={formData.testNum} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Owner Name</label>
          <input type="text" name="owner.name" value={formData.owner.name} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Owner Username</label>
          <input type="text" name="owner.username" value={formData.owner.username} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Owner Email</label>
          <input type="email" name="owner.email" value={formData.owner.email} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Owner Password</label>
          <input type="password" name="owner.password" value={formData.owner.password} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Location Name</label>
          <input type="text" name="location.name" value={formData.location.name} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Latitude</label>
          <input type="number" name="location.latitude" value={formData.location.latitude} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Longitude</label>
          <input type="number" name="location.longitude" value={formData.location.longitude} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Last Crop Type</label>
          <input type="text" name="location.lastCropType" value={formData.location.lastCropType} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Current Crop Type</label>
          <input type="text" name="location.currentCropType" value={formData.location.currentCropType} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
        <div>
          <label className="block mb-2 text-[#EEEEEE]">Next Crop Type</label>
          <input type="text" name="location.nextCropType" value={formData.location.nextCropType} onChange={handleChange} className="w-full p-2  rounded bg-[#222831] text-[#EEEEEE]" />
        </div>
      </div>
      <button type="submit" className="mt-4 mr-2 text-[#EEEEEE] bg-[#76ABAE] rounded-lg p-4 hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300">Submit</button>
      <button className="mt-4 ml-2 text-[#EEEEEE] bg-[#76ABAE] rounded-lg p-4 hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300" onClick={() => window.location.href='/fetchData'}>View All Data</button>
    </form>
  </div>
</div>
  );
}

export default FetchData;