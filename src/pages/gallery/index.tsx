'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Center,
  Divider,
  Group,
  Loader,
  Text,
  Notification,
} from '@mantine/core';
import { apiWorkGallery } from '../api/ApiServices';

const Gallery = () => {
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

  const handleArtistClick = (artist: string) => {
    router.push(`artists/${encodeURIComponent(artist)}`); // Navigate to dynamic page with artist name in URL
  };

  return (
    <section className='container md:w-[90%] mx-auto'>
      <Center mb={20}>
        <Box>
          <h1 className='md:text-[35px] text-[27px] font-[700] mt-28'>
            ARTCOLONY’S GALLERY
          </h1>
          <Group justify='flex-end'>
            <Divider
              size='sm'
              color='#DA3400'
              className='md:w-[10rem] w-[8rem]'
            />
          </Group>
        </Box>
      </Center>
      {loading && (
        <Center mt={20}>
          <Loader />
        </Center>
      )}

      {error && (
        <Notification title='Error' color='red'>
          {error}
        </Notification>
      )}

      {!loading && !error && (
        <div className='md:grid grid-cols-3 gap-5 md:p-0 p-3 md:space-y-5 space-y-16'>
          {allGallery.map((artist, _id) => (
            <div
              key={_id}
              className='item mt-5 cursor-pointer'
              onClick={() => handleArtistClick(artist._id)}
            >
              <img
                className='h-[50vh] md:h-[90%] w-[100%]'
                src={artist.previewImage}
                alt={`artist from ${artist.title}`}
              />
              <h3 className='font-bold my-3'>{artist.title}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
