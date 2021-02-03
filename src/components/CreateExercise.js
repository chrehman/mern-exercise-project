import axios from 'axios';
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {

    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        // setUsers(['test user'])
        // setUsername('test user')
        axios.get('http://localhost:5000/users/')
            .then(res => {
                console.log(res.data)
                setUsers(res.data.map(user => user.username))
                setUsername(res.data[0].username)
            })
    }, [])

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }

    const onChangeDate = (date) => {
        setDate(date)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        };
        console.log(exercise);
    axios.post('http://localhost:5000/exercises/add',exercise)
    .then(res =>{console.log(res.json())})
    .catch(err => console.log(err))

        window.location = '/';
    }
    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={(e) => {
                onSubmit(e)
            }}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => { onChangeUsername(e) }}>
                        {
                            users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={(e) => { onChangeDescription(e) }}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={(e) => { onChangeDuration(e) }}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={(e) => { onChangeDate(date) }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default CreateExercise
