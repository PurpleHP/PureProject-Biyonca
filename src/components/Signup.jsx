import React from 'react';
import CryptoJS from 'crypto-js';

const Signup =  () => {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  async function registerUser(username, password){ //Authority -> USER
    const key = import.meta.env.VITE_ENCRYPTION_KEY;
    if (!key) {
      console.error("Encryption key is not defined");
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();

    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "username": username,
        "password": password,
        "authorities": [
          "USER"
        ]
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:8888/security/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let currentDate = new Date()
          let expirationDate = new Date()
          expirationDate.setTime(currentDate.getTime() +  (50 * 60 * 1000));
          console.log(expirationDate)
          const encrptedToken = CryptoJS.AES.encrypt(result.access_token, key).toString();
          console.log(result.access_token)
          localStorage.setItem("token", encrptedToken);
          localStorage.setItem("tokenExpiration", expirationDate);
          localStorage.setItem("username", username);
          localStorage.setItem("password", encryptedPassword);
          window.location.href = "/fetchData";
        })
        .catch((error) => {
          console.error(error)
          alert("Cannot register user");
        });
    } catch (error){
      alert("Cannot register user");
      console.error(error);
    }
  }



  const handleRegister = async (e) => {
    e.preventDefault();
    const realUsername = e.target.username.value;
    const newPassword = e.target.password.value;

    if (!emailRegex.test(realUsername)) {
      alert("Please enter a valid email address.");
      return;
    }

    await registerUser( realUsername, newPassword);
  }

  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#222831]">
      <div className="bg-[#31363F] shadow-2xl shadow-black p-8 rounded-lg  w-96">
        <h2 className="text-[#EEEEEE] text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-[#EEEEEE] mb-2">Username (Email)</label>
            <input required type="email" id="username" className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE]" />
          </div>
          <div className="mb-6">
            <label className="block text-[#EEEEEE] mb-2">Password</label>
            <input required type="password" id="password" className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE]" />
          </div>
          <button type="submit" className="w-full bg-[#76ABAE] shadow-2xl shadow-black text-[#EEEEEE] p-2 rounded hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300">Sign Up</button>
        </form>
      </div>
      <a href="login" className="text-[#EEEEEE] mt-8 shadow-2xl shadow-black  bg-[#76ABAE] p-3 rounded-lg text-xl hover:bg-[#5A8A8C] hover:scale-125 transition-transform duration-300">Login</a>
    </div>
  );
}

export default Signup