const Home = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#0B090A]">
            <h1 className="text-6xl lg:text-9xl text-white font-extrabold">Biyonca</h1>
            <div className="flex flex-row mt-10 lg:mt-20">
                <a href="/Login" className="bg-[#161A1D] text-center text-3xl lg:text-5xl mx-5 hover:bg-gray-700 hover:scale-125  text-white font-bold p-4 lg:py-6 lg:px-6 rounded">Login</a>
                <a href="/Signup" className="bg-[#161A1D] text-center  text-3xl lg:text-5xl mx-5 hover:bg-gray-700 hover:scale-125  text-white font-bold p-4 lg:py-6 lg:px-6 rounded">Sign Up</a>
            </div>
        </div>
    )
}

export default Home