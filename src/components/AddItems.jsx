const AddItems = () => {

    const [items, setItems] = useState([]);
    //Adds a container with text and id with a border
    const AddEmptyContainer = () => {
        setItems([...items, {id: items.length, text: 'Empty Container'}]);
        return (
            <div className="border border-black w-[50vw] text-center m-5 p-5">
                <p>Empty Container</p>
            </div>
        );
    }

    return (
        <div className="justify-center flex h-screen">
            <h1>Add Items</h1>
            <button onClick={AddEmptyContainer}>Add Empty Container</button>
        </div>
    );
}