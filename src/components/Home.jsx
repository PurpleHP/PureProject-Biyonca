const Home = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-3xl lg:text-5xl">Biyonca</h1>
            <div className="flex flex-row">
                <a href="/Login" className="bg-[#161A1D] text-2xl mx-5 hover:bg-gray-700 hover:scale-125 mt-10 text-white font-bold py-2 px-4 rounded">Login</a>
                <a href="/Signup" className="bg-[#161A1D] text-2xl mx-5 hover:bg-gray-700 hover:scale-125 mt-10 text-white font-bold py-2 px-4 rounded">SignUp</a>

            </div>
        </div>
    )
}

export default Home