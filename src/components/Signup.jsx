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
          const expires = new Date(Date.now() + 3000 * 1000).toUTCString(); //cookie expires in 50 minutes
          console.log(expires);
          localStorage.setItem("token", result.access_token);
          localStorage.setItem("tokenExpiration", expires);
          localStorage.setItem("username", username);
          localStorage.setItem("password,", password);
          //document.cookie = `token=${result.access_token}; path=/; expires=${expires}; secure; HttpOnly; SameSite=Strict`;
          window.location.href = "/testData";
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
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F4F6]">
    <div className="bg-[#e8e8e8] border-black border-2 p-8 rounded-lg shadow-md w-96">
      <h2 className="text-[#1E3A8A] text-2xl mb-6">Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-[#1E3A8A] mb-2">Name</label>
          <input required type="text" id="realname" className="w-full p-2 rounded bg-[#E5E7EB] text-[#1E3A8A]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E3A8A] mb-2">Username</label>
          <input required type="text" id="username" className="w-full p-2 rounded bg-[#E5E7EB] text-[#1E3A8A]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#1E3A8A] mb-2">Password</label>
          <input required type="password" id="password" className="w-full p-2 rounded bg-[#E5E7EB] text-[#1E3A8A]" />
        </div>
        <button type="submit" className="w-full bg-[#10B981] text-white p-2 rounded hover:bg-[#059669]">Sign Up</button>
      </form>
    </div>
    <a href="login" className="text-white mt-4 bg-[#F59E0B] p-3 rounded-lg text-xl hover:bg-[#D97706] transition-colors duration-300">Login</a>
  </div>
);
}

export default Signup