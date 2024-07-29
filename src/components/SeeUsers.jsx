import { useEffect } from "react";

const Signup =  () => {

    useEffect(() => {
        const  seeUser = async ( ) => {
            try{
              const response = await fetch('https://localhost:8888/v1/users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
      
              });
          
              if(!response.ok){
                throw new Error('Fetching Up Users failed');
              }
              const data = await response.json();
              console.log(data);
            } catch (error){
              console.error(error);
            }
        }
        seeUser();
    }, []);
    

    useEffect(() => {
        const  seeUser = async ( ) => {
            try{
              const response = await fetch('https://localhost:8888/v1/users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
      
              });
          
              if(!response.ok){
                throw new Error('Fetching Up Users failed');
              }
              const data = await response.json();
              console.log(data);
            } catch (error){
              console.error(error);
            }
        }
        seeUser();
    }, []);
  
  
    
  
      return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B090A]">
        <p className=""></p>
  
      </div>
      )
  }
  
  export default Signup