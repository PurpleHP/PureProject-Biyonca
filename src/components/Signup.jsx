const Signup =  () => {

  async function registerUser(realName ,username, password){ //Authority -> USER
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "name": realName,
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
          const expires = new Date(Date.now() + 10 * 1000).toUTCString(); //cookie expires in 50 minutes (3000)
          console.log(expires);
          localStorage.setItem("token", result.access_token);
          localStorage.setItem("tokenExpiration", expires);
          localStorage.setItem("username", username);
          localStorage.setItem("password,", password);
          //document.cookie = `token=${result.access_token}; path=/; expires=${expires}; secure; HttpOnly; SameSite=Strict`;
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
    const newName = e.target.realname.value;
    const realUsername = e.target.username.value;
    const newPassword = e.target.password.value;

    // Directly use newName, newEmail, and newPassword here
    await registerUser(newName, realUsername, newPassword);
  }

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#222831]">
      <div className="bg-[#31363F] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[#EEEEEE] text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-[#EEEEEE] mb-2">Name</label>
            <input required type="text" id="realname" className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#EEEEEE] mb-2">Username</label>
            <input required type="text" id="username" className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#EEEEEE] mb-2">Password</label>
            <input required type="password" id="password" className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE]" />
          </div>
          <button type="submit" className="w-full bg-[#76ABAE] text-[#EEEEEE] p-2 rounded hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300">Sign Up</button>
        </form>
      </div>
      <a href="login" className="text-[#EEEEEE] mt-4 bg-[#76ABAE] p-3 rounded-lg text-xl hover:bg-[#5A8A8C] hover:scale-125 transition-transform duration-300">Login</a>
    </div>
  );
}

export default Signup