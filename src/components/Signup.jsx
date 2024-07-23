const Signup =  () => {

  async function registerUser(email, password){
    try{
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const newName = e.target.ad.value + " " + e.target.soyad.value;
    const newEmail = e.target.email.value;
    const newPassword = e.target.passw.value;

    // Directly use newName, newEmail, and newPassword here
    await registerUser(newName, newEmail, newPassword);
  }

  

    return(
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B090A]">
      <div className="bg-[#161A1D] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[#D3D3D3] text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleRegister} >
          <div className="mb-4">
              <label className="block text-[#D3D3D3] mb-2" htmlFor="firstName">Username</label>
              <input type="text" id="firstName" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#D3D3D3] mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <div className="mb-6">
            <label className="block text-[#D3D3D3] mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" className="w-full p-2 rounded bg-[#0B090A] text-[#D3D3D3]" />
          </div>
          <button type="submit" className="w-full bg-[#D3D3D3] text-[#0B090A] p-2 rounded">Sign Up</button>
        </form>
      </div>
      <a href="login" className="text-white mt-4 bg-[#161A1D] p-3 rounded-lg text-xl">Sign Up</a>

    </div>
    )
}

export default Signup