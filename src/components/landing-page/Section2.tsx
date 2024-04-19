import { apiFeaturedArtwork } from '@/pages/api/ApiServices';
import { Box, Center, Divider, Group } from '@mantine/core';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { Loader, Notification } from '@mantine/core';

const Section2 = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState<FeaturedArtwork[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter
  
  const fetchData = async () => {
    try {
      const response = await apiFeaturedArtwork();
      console.log(response.featuredArtworks);
      if (response) {
        setFeaturedArtworks(response.featuredArtworks);
      } else {
        throw new Error(error);
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
    <section className='container md:w-[90%] mx-auto md:px-0 p-3'>
      <Center mb={20}>
        <Box>
          <h1 className='md:text-[35px] text-[30px] mt-10 font-[700]'>
            FEATURED ARTWORKS
          </h1>
          <Group justify='flex-start'>
            <Divider size='sm' color='#DA3400' className='md:w-[10.5rem] w-[9rem]' />
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
        <div className='md:grid md:grid-cols-3 md:gap-6 space-y-16 md:space-y-0'>
          {featuredArtworks.map((item) => (
            <div className='item' key={item._id}>
              <Link href='/artists'>
                <img
                  className='h-[65%] w-[100%]'
                  src={item.previewImage}
                  alt={item.title}
                />
              </Link>
              <h3 className='font-bold my-1'>{item.title}</h3>
              <div className='text-sm font-medium'>
                <p className='my-2'>
                  {item.categories[0].charAt(0).toUpperCase() +
                    item.categories[0].slice(1)}
                </p>
                <p className='my-2'>
                  {item.categories[1]
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
                <p>{`${item.dimensionLengthInCM}" x ${item.dimensionWidthInCM}"`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Section2;
