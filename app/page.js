'use client'

import './list.scss'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function AppPage(props) {
  const apiKey = 'd0d30ff328b33172be050917d5c40fb2'
  const router = useRouter()
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
      <nav className="container-fluid px-0">
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
            className="search-sec col-md-4 col-12 order-md-2 order-3 d-flex align-items-center p-0 mt-2 mt-md-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="search-input w-100"
              placeholder="搜尋電影名稱"
              onChange={(e) => {
                setSearchName(e.target.value)
              }}
              onKeyDown={handleSearch}
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
      </nav>
      <div className="d-flex">
        {searchMovies?.map((movie) => (
          //產品卡元件
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
        {nowPlayingMovies?.map((movie) => (
          //產品卡元件
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => {
              console.log(movie.id)
              router.push(`/detail/${movie.id}`)
            }}
          >
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
