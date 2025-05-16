'use client'

import './list.scss'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AppPage(props) {
  const apiKey = 'd0d30ff328b33172be050917d5c40fb2'
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchMovies, setSearchMovies] = useState([])

  const getNowPlayingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=zh-TW&page=1`
      )
      const result = await res.json()
      console.log(result.results)
      setNowPlayingMovies(result.results)
    } catch (err) {
      console.log(err)
    }
  }
  const getSearchMovie = async (searchName) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchName}&include_adult=false&language=zh-TW&page=1`
      )
      const result = await res.json()
      console.log(result.results)
      setSearchMovies(result.results)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getSearchMovie(searchName)
    }
  }

  useEffect(() => {
    getNowPlayingMovies()
  }, [])

  return (
    <>
      <h1>search</h1>
      <input
        type="text"
        placeholder="搜尋電影名稱"
        // value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value)
        }}
        onKeyDown={handleSearch}
      />
      <div className="d-flex">
        {searchMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="poster position-relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-fit-cover"
              />
            </div>
            <div>{movie.title}</div>
          </div>
        ))}
      </div>
      <div className="d-flex">
        {nowPlayingMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="poster position-relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-fit-cover"
              />
            </div>
            <div>{movie.title}</div>
          </div>
        ))}
      </div>
    </>
  )
}
