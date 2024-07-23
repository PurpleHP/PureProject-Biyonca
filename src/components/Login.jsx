const Login =  () => {

  async function loginUser(username, password){
    try{
      const response = await fetch('https://www.google.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if(!response.ok){
        throw new Error('Login failed');
      }
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.error(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const newName = e.target.username.value;
    const newPassword = e.target.passw.value;
    
    //send post request to the server
    await loginUser(newName, newPassword);
  }


    return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B090A]">
      <div className="bg-[#161A1D] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[#D3D3D3] text-2xl mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#D3D3D3] mb-2" htmlFor="username">Username</label>
            <input type="email" id="email" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-6">
            <label className="block text-[#D3D3D3] mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <button type="submit" className="w-full bg-[#D3D3D3] text-[#0B090A] p-2 rounded">Login</button>
        </form>
      </div>
      <a href="signup" className="text-white bg-[#161A1D] p-3 rounded-lg text-xl mt-2">Sign Up</a>

    </div>)
}

export default Login