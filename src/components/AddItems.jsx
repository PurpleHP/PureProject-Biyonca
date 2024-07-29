import React, { useState } from 'react';

const AddItems = () => {

    const [items, setItems] = useState([]);
    //Adds a container with text and id with a border
    const AddEmptyContainer = () => {
        setItems([...items, {id: items.length, text: 'Empty Test'}]);
    }

    const ResetItems = () => {
        setItems([]);
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen bg-gray-400 text-white">
            <div className='flex flex-row'>
                <button className='flex border-2 m-2 p-2' onClick={AddEmptyContainer}>Add New Test</button>
                <button className='flex border-2 m-2 p-2' onClick={ResetItems}>Reset Tests</button>
            </div>
          
            <div className="flex flex-col">
                {items.map((item) => (
                <div key={item.id} className="border justify-center border-black w-[50vw] text-center m-5 p-5">
                    <p>{item.text}</p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default AddItems;