import { apiWorkGallery } from '@/pages/api/ApiServices';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  Text,
  Notification,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Section4 = () => {
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
  return (
    <>
      <Flex
        mih={10}
        className='mt-10 md:mt-16'
        justify='flex-start'
        direction='row'
      >
        <img src='/assets/star.png' alt='star icon' className='w-[30px]' />
      </Flex>

      <section className='container md:w-[90%] mx-auto md:px-0 p-3 mt-0 md:mt-16'>
        <Center>
          <Box>
            <Text size='35px' fw={700}>
              OUR WORK
            </Text>
            <Divider my='xs' size='sm' color='#DA3400' w={80} />
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
          <div className='md:grid md:grid-cols-3 md:gap-6 mt-3 md:mt-5 space-y-16 md:space-y-0'>
            {allGallery.slice(3, 6).map((artist, _id) => (
              <div key={_id} className='item cursor-pointer'>
                <Link href='/gallery'>
                  <img
                    className='h-[90%] w-[100%]'
                    src={artist.previewImage}
                    alt={`artist from ${artist.title}`}
                  />
                </Link>
                <h3 className='font-bold my-1'>{artist.title}</h3>
                <div className='text-sm font-medium'>
                  <p className='my-2'>
                    {artist.categories[0].charAt(0).toUpperCase() +
                      artist.categories[0].slice(1)}
                  </p>
                  <p className='my-2'>
                    {artist.categories[1]
                      .split(' ')
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                  </p>
                  <p>{`${artist.dimensionLengthInCM}" x ${artist.dimensionWidthInCM}"`}</p>
                </div>
                {/* <p>{artist.fullBiography}</p> */}
              </div>
            ))}
          </div>
        )}

        <Center className='mt-[1.5rem] md:mt-[7rem]'>
          <Button
            variant='transparent'
            color='black'
            td='underline'
            display='block'
            px={0}
            component='a'
            href='/gallery'
          >
            View All Our Artworks
          </Button>
        </Center>
      </section>
    </>
  );
};

export default Section4;
