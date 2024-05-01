'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for client-side rendering

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { apiWorkGallery } from '@/pages/api/ApiServices';
import { useRouter } from 'next/router';
import { Center, Loader, Notification } from '@mantine/core';

const Banner = () => {
   const [allGallery, setAllGallery] = useState<Exhibition[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const router = useRouter(); // Initialize useRouter

   const fetchData = async () => {
     try {
       const response = await apiWorkGallery();
       console.log(response);
       if (response.success) {
         setAllGallery(response.works || []);
       } else {
         throw new Error(response.message);
       }
     } catch (error) {
       // Network error
       if (error instanceof TypeError) {
         setError('Network error occurred. Please try again later.');
       } else {
         // Other errors
         console.error('Error fetching featured artworks:', error);
         setError('Error fetching featured artworks');
       }
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     fetchData();
   }, []);
  const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
  });
  const Responsive: {} = {
    0: {
      items: 1,
      margin: 0,
    },
    768: {
      items: 1,
      margin: 0,
    },
    1024: {
      items: 1,
      margin: 0,
    },
  };

  return (
    <section className=' mx-auto relative '>
      {/* {loading && (
        <Center mt={20}>
          <Loader />
        </Center>
      )} */}
      {error && (
        <Notification title='Error' color='red'>
          {error}
        </Notification>
      )}

      <OwlCarousel
        responsive={Responsive}
        animateOut={'fadeOut'}
        autoplay={true}
        loop={true}
        dots={true}
        dotsEach={true}
        lazyLoad={true}
        autoplaySpeed={300}
        className=' z-0'
      >
        {allGallery.map((image, index) => (
          <div className='' key={index}>
            <img
              className='h-[88vh] w-full'
              src={image.images[0]}
              alt={image.title}
            />
            <div className='my-4 text-center font-bold'>
              <h4 className='text-red'>{image.title}</h4>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default Banner;
