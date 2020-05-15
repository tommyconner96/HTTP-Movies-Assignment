import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'

const UpdateMovie = (props) => {
    // const initialState = {
    //     id: { id },
    //     title: '',
    //     director: '',
    //     metascore: '',
    //     stars: []
    // }
    
    const [form, setForm] = useState({
        // id: Date.now(),
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    const  {history}  = useHistory()
    const { id } = useParams()

    const handleChange = (e) => {
        e.preventDefault()
        setForm ({
            ...form, [e.target.name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, form)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
            // history('/')
    }
    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                placeholder='title'
                onChange={handleChange}
                value={form.title}
            />
            <input
                type='text'
                name='director'
                placeholder='director'
                onChange={handleChange}
                value={form.director}
            />
            <input
                type='text'
                name='metascore'
                placeholder='metascore'
                onChange={handleChange}
                value={form.metascore}
            />
            <input
                type='text'
                name='stars'
                placeholder='stars'
                onChange={handleChange}
                value={form.stars}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}
export default UpdateMovie
