const AddItems = () => {

    //Adds a container with text and id with a border
    const AddEmptyContainer = () => {
        return (
            <div className="border border-black w-[50vw]">
                <p>Empty Container</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Add Items</h1>
            <button >Add Item</button>

        </div>
    );
}