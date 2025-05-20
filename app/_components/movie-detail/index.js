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
        className={`${styles['background']} p-5`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
        }}
      >
        <div className="row w-100 h-100 m-0">
          <div className="col-5 ps-0">
            <div className={`${styles['main-image']} position-relative`}>
              <Image
                src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
                alt={`${movieDetail.title}`}
                fill
                className="object-fit-cover"
              />
            </div>
          </div>
          <div className="col-7 pe-0 d-flex align-items-center">
            <div className="detail-text">
              <div className="detail-title mt-2 mb-4">
                <h2>{movieDetail.title}</h2>
                <h4>{movieDetail.original_title}</h4>
              </div>
              <div className="detail-info d-flex gap-3 mb-5">
                <h6>{movieDetail.release_date?.split('-')[0]}</h6>
                <h6>{movieDetail.runtime} 分鐘</h6>
                <h6>
                  {movieDetail.genres?.map((genre) => genre.name).join('、')}
                </h6>
              </div>
              <h6 className={`${styles['detail-overview']} mb-3`}>
                {movieDetail.overview}
              </h6>
              <h6 className="detail-director">
                導演 ：{' '}
                {movieDetail.credits?.crew
                  ?.filter((crew) => crew.job === 'Director')
                  .map((crew) => crew.name)
                  .join('、')}
              </h6>
              <h6 className="detail-cast">
                演員 ：{' '}
                {movieDetail.credits?.cast
                  ?.slice(0, 6)
                  .map((cast) => cast.name)
                  .join('、')}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-5">
        <div className="detail-trailer mb-5">
          <h3 className="mb-3">預告片</h3>
          {movieDetail.videos?.results?.length === 0 ? (
            <div className="no-trailer">
              <h5>目前沒有任何預告片</h5>
            </div>
          ) : (
            <>
              <div className="d-flex gap-3">
                {movieDetail.videos?.results
                  ?.filter(
                    (video) =>
                      video.site === 'YouTube' && video.type === 'Trailer'
                  )
                  .map((video) => (
                    <div key={video.id} className={`${styles['trailer-card']}`}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
        <div className="detail-comment">
          <h3 className="mb-3">評論</h3>
          {movieDetail.reviews?.results?.length === 0 ? (
            <div className="no-comment">
              <h5>目前沒有任何評論</h5>
            </div>
          ) : (
            <>
              {movieDetail.reviews?.results?.map((review) => (
                <div key={review.id} className={`${styles['comment-card']}`}>
                  <h5>{review.author}</h5>
                  <p className="mb-0">{review.content}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
