'use client'

import styles from './movie-card.module.scss'
import Image from 'next/image'

export default function MovieCard({ data = {}, setSelectedMovie = () => {} }) {
  return (
    <div
      className={`${styles['movie-card']}`}
      role="button"
      tabIndex={0}
      onClick={setSelectedMovie}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setSelectedMovie()
        }
      }}
    >
      <div className={`${styles['poster']} position-relative`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          fill
          className={`${styles['poster-img']}`}
        />
      </div>
      <div className={`${styles['info']} p-2`}>
        <div>
          <h6 className="mb-0">{data.original_title}</h6>
        </div>
        <div>
          <p className="mb-0">
            上映日期 {data.release_date?.replace(/-/g, '/')}
          </p>
        </div>
      </div>
    </div>
  )
}
