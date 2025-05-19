'use client'

import styles from './movie-card.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function MovieCard({ data = {} }) {
  const router = useRouter()

  return (
    <div
      className={`${styles['movie-card']}`}
      onClick={() => {
        console.log(data.id)
        router.push(`/detail/${data.id}`)
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
