const Home = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#222831]">
            <h1 className="text-6xl lg:text-9xl text-[#EEEEEE] font-extrabold">Biyonca</h1>
            <div className="flex flex-row mt-10 lg:mt-20">
                <a href="/Login" className="bg-[#76ABAE] text-center text-3xl 
                lg:text-5xl mx-5 hover:bg-[#5A8A8C] hover:scale-125 text-[#EEEEEE] font-bold
                 p-4 lg:py-6 lg:px-6 rounded transition-transform duration-300">Login</a>
                <a href="/Signup" className="bg-[#76ABAE] text-center text-3xl 
                lg:text-5xl mx-5 hover:bg-[#5A8A8C] hover:scale-125 text-[#EEEEEE] font-bold 
                p-4 lg:py-6 lg:px-6 rounded transition-transform duration-300">Sign Up</a>
            </div>
        </div>
    )
}

export default Home;