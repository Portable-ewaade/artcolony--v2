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
import { apiArtist } from '../api/ApiServices';

const Artist = () => {
  const [allArtist, setAllArtist] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const fetchData = async () => {
    try {
      const response = await apiArtist();
      console.log(response);
      if (response.success) {
        setAllArtist(response.artists || []);
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
    router.push(`artists/${encodeURIComponent(artist)}`);
  };

  return (
    <section className='container md:w-[90%] mx-auto pt-32'>
      <Center mb={20}>
        <Box>
          <Text size='35px' fw={700}>
            OUR ARTISTS
          </Text>
          <Group justify='flex-start'>
            <Divider my='xs' size='sm' color='#DA3400' w={80} />
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
        <div className='md:grid grid-cols-3 md:gap-5 md:p-0 p-3'>
          {allArtist.map((artist, _id) => (
            <div
              key={_id}
              className='item mt-5 cursor-pointer'
              onClick={() => handleArtistClick(artist._id)}
            >
              <img
                className='h-[50vh] md:h-[90%] w-[100%] '
                src={artist.previewImageWork}
                alt={`artist from ${artist.firstName}`}
              />
              <h3 className='font-bold mt-3 pb-5'>{`${artist.firstName} ${artist.lastName}`}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Artist;
