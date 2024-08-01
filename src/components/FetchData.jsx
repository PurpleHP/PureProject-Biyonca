import React, { useState } from "react";

const FetchData = () => {

    const [allTestInfo, setAllTestInfo] = useState([]);

    const authToken = localStorage.getItem("token");
    const fetchData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authToken}`); // Add Bearer token to the Authorization header

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("http://localhost:8888/v1/testInfo/find_all", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            setAllTestInfo(result);
            console.log(result)})
        .catch((error) => console.error(error));
    }
        
    return (
        <div className="bg-[#0B090A] flex flex-col w-screen h-screen justify-center items-center">
            <button className=" text-white" onClick={fetchData}>Fetch Data</button>
            <p className="text-white w-screen break-words">{allTestInfo}
        </p>
        </div>
    )
}

export default FetchData;