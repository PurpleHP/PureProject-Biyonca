import React, { useState } from 'react';

const AddItems = () => {

    const [items, setItems] = useState([]);
    // Adds a container with text and id with a border
    const AddEmptyContainer = () => {
        setItems([...items, {id: items.length, text: 'Empty Test'}]);
    }

    const ResetItems = () => {
        setItems([]);
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen bg-[#F3F4F6] text-[#1E3A8A]">
            <div className='flex flex-row'>
                <button className='flex border-2 border-[#1E3A8A] m-2 p-2 bg-[#10B981] text-white hover:bg-[#059669]' onClick={AddEmptyContainer}>Add New Test</button>
                <button className='flex border-2 border-[#1E3A8A] m-2 p-2 bg-[#F59E0B] text-white hover:bg-[#D97706]' onClick={ResetItems}>Reset Tests</button>
            </div>
          
            <div className="flex flex-col">
                {items.map((item) => (
                <div key={item.id} className="border justify-center border-[#1E3A8A] w-[50vw] text-center m-5 p-5 bg-white text-[#1E3A8A]">
                    <p>{item.text}</p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default AddItems;