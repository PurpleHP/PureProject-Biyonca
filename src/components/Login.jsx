import axios from "axios";

const Login = () => {
  async function loginUser(username, password) {
    try {
      const myHeaders = {
        "Content-Type": "application/json",
      };

      const data = {
        username: username,
        password: password
      };

      const response = await fetch("http://localhost:8888/security/login", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
      });

      const result = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const newName = e.target.username.value;
    const newPassword = e.target.password.value;

    await loginUser(newName, newPassword);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#222831]">
      <div className="bg-[#31363F] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[#76ABAE] text-2xl mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#76ABAE] mb-2" htmlFor="username">Username</label>
            <input required type="text" id="username" className="w-full p-2 rounded bg-[#EEEEEE] text-[#31363F]" />
          </div>
          <div className="mb-6">
            <label className="block text-[#76ABAE] mb-2" htmlFor="password">Password</label>
            <input required type="password" id="password" className="w-full p-2 rounded bg-[#EEEEEE] text-[#31363F]" />         
          </div>
          <button type="submit" className="w-full bg-[#76ABAE] text-[#31363F] p-2 rounded hover:bg-[#5A8A8C] hover:scale-105 transition-transform duration-300">Login</button>
        </form>
      </div>
      <a href="signup" className="text-[#31363F] bg-[#76ABAE] p-3 rounded-lg text-xl mt-5 hover:bg-[#5A8A8C] hover:scale-125 transition-transform duration-300">Sign Up</a>
    </div>
  )
}

export default Login;