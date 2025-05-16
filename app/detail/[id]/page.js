'use client'

import './detail.scss'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function DetailIdPage(props) {
  const apiKey = 'd0d30ff328b33172be050917d5c40fb2'
  //取得網址上的動態參數
  const params = useParams()
  const id = params.id
  const [movieDetails, setMovieDetails] = useState({})

  const getDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos%2Ccredits%2Creviews&language=zh-TW`
      )
      const result = await res.json()
      console.log(result)
      // result是物件
      setMovieDetails(result)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <>
      <h1>details</h1>
      <div className="d-flex">
        <div>
          <div className="poster position-relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={`${movieDetails.title}`}
              fill
              className="object-fit-cover"
            />
          </div>
          <div>{movieDetails.title}</div>
        </div>
      </div>
    </>
  )
}
