import axios from 'axios';
import React, { useState } from 'react'

const CreateUser = () => {

    const [username, setUsername] = useState('')


    // useEffect(() => {
    //     setUsers(['test user'])
    //     setUsername('test user')

    // }, [])

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
        };
        console.log(newUser);
        console.log("HEllo")
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data));
        setUsername('')
        // window.location = '/';
    }
    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={(e) => {
                onSubmit(e)
            }}>

                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => { onChangeUsername(e) }}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default CreateUser
