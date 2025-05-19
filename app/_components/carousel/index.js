'use client'

import styles from './carousel.module.scss'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
// components
import MovieCard from '../movie-card'
// react
import Image from 'next/image'
import { useRef, useState } from 'react'

export default function Carousel({ data = {}, setSelectedMovie }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  return (
    <>
      <div className={styles['swiper-sec']}>
        {/* 自定義左右箭頭按鈕 */}
        <div
          ref={prevRef}
          className={styles['custom-swiper-button-prev']}
          style={{ display: isFirstSlide ? 'none' : 'flex' }}
        >
          <Image src="/images/arrow_left.svg" alt="" width={16} height={16} />
        </div>
        <div ref={nextRef} className={styles['custom-swiper-button-next']}>
          <Image src="/images/arrow_right.svg" alt="" width={16} height={16} />
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={6}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          onSlideChange={(swiper) => {
            setIsFirstSlide(swiper.isBeginning)
          }}
          breakpoints={{
            390: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1200: { slidesPerView: 6 },
          }}
          className={`mySwiper ${styles['my-swiper']}`}
        >
          {data?.map((movie, i) => (
            <SwiperSlide key={i} className={styles['swiper-slide']}>
              <MovieCard
                data={movie}
                setSelectedMovie={() => {
                  setSelectedMovie(movie.id)
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
