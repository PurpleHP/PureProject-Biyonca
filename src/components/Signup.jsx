const Signup =  () => {

  async function registerUser(username, password){ //Authority -> USER
    try{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer eyJraWQiOiJlMTMxOTMzOS0wNWY1LTRhZDItYTdlOS0zNGJhMGYxOTM3ZmEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pblVzZXIiLCJhdWQiOiJtZXNzYWdpbmctY2xpZW50IiwibmJmIjoxNzIyMjYxNjMyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAiLCJleHAiOjE3MjIyNjUyMzIsImlhdCI6MTcyMjI2MTYzMiwianRpIjoiNmI0OGVmN2ItNDQ5Ny00NTM4LThkZTItZGEyZTJiYWZiZWRjIiwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXX0.onNV66RIHf7Gs15TWGsw2kOoHpasCW4Dl3wEVN3qKzxdotGz4JcGFMnr-TTiSPrM1BOm_wz8jr9yuU8XBwmESHePh5Q2svpwzU_UQgmEdLfWUXrJ5pCjLeULNXt-wWpSEiPQFM-Rn6eOD86p0_yasnrtulCyCrrUsNtBt8N9FnfFrKilour5RbzuuE993QoF68kakoJlNs0HZtNPmm16Dj-bcKgAbxMvTT6zJUWRPOE3yjOhiE6zW6JqpKZTpdI5VDNZzERv4lbWIUPAB-9G8I7YULeG93E29YQEkFzPkYvjq2KKnCMYXXcE_ba2HX5OtXkfuzgqOfUAO0a0qri8sA");
      myHeaders.append("Cookie", "JSESSIONID=A4C88B3FB6BD31D20CB3318D2C6EEFA2");

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
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } catch (error){
      console.error(error);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const newName = e.target.username.value;
    const newEmail = e.target.email.value;
    const newPassword = e.target.password.value;

    // Directly use newName, newEmail, and newPassword here
    await registerUser(newName, newEmail, newPassword);
  }

  

    return(
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B090A]">
      <div className="bg-[#161A1D] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[#D3D3D3] text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleRegister} >
          <div className="mb-4">
              <label className="block text-[#D3D3D3] mb-2" htmlFor="username">Username</label>
              <input type="text" id="firstName" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#D3D3D3] mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#D3D3D3] mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <button type="submit" className="w-full bg-[#D3D3D3] text-[#0B090A] p-2 rounded">Sign Up</button>
        </form>
      </div>
      <a href="login" className="text-white mt-4 bg-[#161A1D] p-3 rounded-lg text-xl">Login</a>

    </div>
    )
}

export default Signup