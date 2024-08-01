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
          localStorage.setItem("token", result.access_token);
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

  

    return(
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B090A]">
      <div className="bg-[#161A1D] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[#D3D3D3] text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleRegister} >
          <div className="mb-4">
              <label className="block text-[#D3D3D3] mb-2">Name</label>
              <input required type="text" id="realname" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#D3D3D3] mb-2">Username</label>
            <input required type="text" id="username" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#D3D3D3] mb-2">Password</label>
            <input required type="password" id="password" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <button type="submit" className="w-full bg-[#D3D3D3] text-[#0B090A] p-2 rounded">Sign Up</button>
        </form>
      </div>
      <a href="login" className="text-white mt-4 bg-[#161A1D] p-3 rounded-lg text-xl">Login</a>

    </div>
    )
}

export default Signup