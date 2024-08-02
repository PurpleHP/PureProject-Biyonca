const Home = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#F3F4F6]">
            <h1 className="text-6xl lg:text-9xl text-[#1E3A8A] font-extrabold">Biyonca</h1>
            <div className="flex flex-row mt-10 lg:mt-20">
                <a href="/Login" className="bg-[#10B981] text-center text-3xl 
                lg:text-5xl mx-5 hover:bg-[#059669] hover:scale-125 text-white font-bold
                 p-4 lg:py-6 lg:px-6 rounded transition-transform duration-300">Login</a>
                <a href="/Signup" className="bg-[#F59E0B] text-center text-3xl 
                lg:text-5xl mx-5 hover:bg-[#D97706] hover:scale-125 text-white font-bold 
                p-4 lg:py-6 lg:px-6 rounded transition-transform duration-300">Sign Up</a>
            </div>
        </div>
    )
}

export default Home;