'use client'

import './list.scss'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { debounce } from 'lodash'
import { ScaleLoader } from 'react-spinners'
// custom components
import MovieCard from './_components/movie-card'
import Carousel from './_components/carousel'
import MovieDetail from './_components/movie-detail'

export default function AppPage() {
  const apiKey = 'd0d30ff328b33172be050917d5c40fb2'
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upComingMovies, setUpComingMovies] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchMovies, setSearchMovies] = useState([])
  const [searchFocused, setSearchFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [selectedMovie, setSelectedMovie] = useState(null)

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
  const getSearchMovies = async (searchName) => {
    try {
      setErrorMessage('')

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchName}&include_adult=false&language=zh-TW&page=1`
      )

      if (!res.ok) throw new Error('無法取得搜尋結果，請稍後再試')
      const result = await res.json()
      console.log(result.results)
      setSearchMovies(result.results)
    } catch (err) {
      console.log(err)
      setErrorMessage(err.message || '發生未知錯誤')
      setSearchMovies([])
    } finally {
      setIsLoading(false)
    }
  }
  const debounceRef = useRef(
    debounce((value) => {
      getSearchMovies(value)
    }, 500)
  )

  const searchFormRef = useRef(null)
  const searchSecRef = useRef(null)
  const movieDetailRef = useRef(null)

  useEffect(() => {
    getNowPlayingMovies()
    getUpComingMovies()

    const handleClickOutside = (e) => {
      if (
        !searchFormRef.current?.contains(e.target) &&
        !searchSecRef.current?.contains(e.target) &&
        !movieDetailRef.current?.contains(e.target)
      ) {
        setSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
                width={230}
                height={30}
                // className="object-fit-cover"
              />
            </Link>
          </div>
          <form
            ref={searchFormRef}
            className="search-form col-md-4 col-12 order-md-2 order-3 d-flex align-items-center p-0 mt-2 mt-md-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="search-input w-100"
              placeholder="搜尋電影名稱"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value)
                setIsLoading(true)
                debounceRef.current(e.target.value)
              }}
              onFocus={() => setSearchFocused(true)}
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
          ref={searchSecRef}
          className={`search-sec ${searchFocused ? 'active' : ''}`}
        >
          <div className="search-result">
            {errorMessage ? (
              <div className="search-no-result">
                <h5>{errorMessage}</h5>
              </div>
            ) : searchName === '' ? (
              <div className="search-no-result">
                <h4>開始尋找想看的電影吧！</h4>
              </div>
            ) : isLoading ? (
              <div className="search-no-result">
                <ScaleLoader
                  color="rgba(1, 180, 228, 0.6)"
                  loading={true}
                  size={30}
                />
              </div>
            ) : searchMovies.length === 0 ? (
              <div className="search-no-result">
                <h4>沒有搜尋到任何電影</h4>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-xl-6 g-3">
                {searchMovies?.map((movie) => (
                  <div key={movie.id} className="col">
                    <MovieCard
                      data={movie}
                      setSelectedMovie={() => {
                        setSelectedMovie(movie.id)
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="movie-carousel container-fluid mt-5">
        <h3 className="h4 mb-3">NOW PLAYING MOVIES</h3>
        <Carousel data={nowPlayingMovies} setSelectedMovie={setSelectedMovie} />
      </div>
      <div className="movie-carousel container-fluid mb-5">
        <h3 className="h4 mb-3">UPCOMING MOVIES</h3>
        <Carousel data={upComingMovies} setSelectedMovie={setSelectedMovie} />
      </div>
      {selectedMovie && (
        <div
          ref={movieDetailRef}
          className="movie-detail-overlay"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            // ref={movieDetailRef}
            className="movie-detail-content"
            onClick={(e) => e.stopPropagation()}
          >
            <MovieDetail
              movieId={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          </div>
        </div>
      )}
    </>
  )
}
