'use client'

import React, { useState, useEffect } from 'react'
import styles from './movie-detail.module.scss'
import Image from 'next/image'

export default function MovieDetail({ movieId = 0 }) {
  const apiKey = 'd0d30ff328b33172be050917d5c40fb2'

  const [movieDetail, setMovieDetail] = useState({})

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos%2Ccredits%2Creviews&language=zh-TW`
        )
        const result = await res.json()
        console.log(result)
        // result是物件
        setMovieDetail(result)
      } catch (err) {
        console.log(err)
      }
    }
    getDetail()
  }, [movieId])

  return (
    <>
      <div
        className={`${styles['background']}`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
        }}
      >
        <div className={`${styles['main-image']} position-relative`}>
          <Image
            src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
            alt={`${movieDetail.title}`}
            fill
            className={`${styles['poster-image']} object-fit-cover`}
          />
        </div>
        <div>{movieDetail.title}</div>
      </div>
    </>
  )
}
