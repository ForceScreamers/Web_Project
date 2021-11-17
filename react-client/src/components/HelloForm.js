
function HelloForm({ onMessage }) {
    // const onMessage = (e) => {
    //     e.preventDefault();
    //     socket.emit('hello from client')
    // }

    return (
        <div>
            <form onSubmit={onMessage}>
                <input type="text" name="t"/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default HelloForm
