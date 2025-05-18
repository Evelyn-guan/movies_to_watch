'use client'

import './list.scss'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// custom components
import MovieCard from './_components/movie-card'
import Carousel from './_components/carousel'

export default function AppPage() {
  const apiKey = 'd0d30ff328b33172be050917d5c40fb2'
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upComingMovies, setUpComingMovies] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchMovies, setSearchMovies] = useState([])
  const [searchFocused, setSearchFocused] = useState(false)

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
  const getUpComingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=zh-TW&page=1`
      )
      const result = await res.json()
      console.log(result.results)
      setUpComingMovies(result.results)
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
    getUpComingMovies()
  }, [])

  return (
    <>
      <nav className="header container-fluid px-0">
        <div className="search-bar row m-0">
          <div className="col-md-4 col-6 order-1 d-flex align-items-center p-0">
            <Link href="/">
              <Image
                src="/images/blue_long_2.svg"
                alt="logo"
                width={200}
                height={30}
                // className="object-fit-cover"
              />
            </Link>
          </div>
          <form
            className="search-form col-md-4 col-12 order-md-2 order-3 d-flex align-items-center p-0 mt-2 mt-md-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="search-input w-100"
              placeholder="搜尋電影名稱"
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </form>
          <div className="col-md-4 col-6 order-md-3 order-2 d-flex justify-content-end align-items-center p-0">
            <button type="button" className="avatar-sec">
              <Image
                className="avatar-img object-fit-cover"
                src="/images/avatar1.jpg"
                alt="avatar"
                width={42}
                height={42}
              />
            </button>
          </div>
        </div>
        <div
          className={`search-result ${
            searchFocused ? 'active' : ''
          } d-flex flex-wrap gap-2`}
        >
          {searchMovies?.map((movie) => (
            <div key={movie.id} className="col-6 col-md-2">
              <MovieCard data={movie} />
            </div>
          ))}
        </div>
      </nav>
      <div className="movie-carousel container-fluid mt-5">
        <h3 className="h4 mb-3">NOW PLAYING MOVIES</h3>
        <Carousel data={nowPlayingMovies} />
      </div>
      <div className="movie-carousel container-fluid mb-5">
        <h3 className="h4 mb-3">UPCOMING MOVIES</h3>
        <Carousel data={upComingMovies} />
      </div>
    </>
  )
}
