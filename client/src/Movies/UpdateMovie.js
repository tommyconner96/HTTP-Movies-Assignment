import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const UpdateMovie = (props) => {
    const [form, setForm] = useState(initialState)
    const  {history}  = useHistory()
    const params = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                setForm(res.data)
            })
            .catch(err => console.log(err))
    },[params.id])

    const handleChange = (e) => {
        e.preventDefault()
        setForm ({
            ...form, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${props.movie.id}`, form)
            .then(res => {
                console.log(res)
                props.setMovieList([...props.movieList, res.data])
                history('/movies')
            })
            .catch(err => console.log(err))
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
            <textarea
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
