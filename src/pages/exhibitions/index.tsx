import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Divider,
  Group,
  Loader,
  Notification,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { apiAllExhb } from '../api/ApiServices';
import { format } from 'date-fns';

const Exhibitions = () => {
  const [artistExhb, setArtistExhb] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchExhb = async () => {
      try {
        const response = await apiAllExhb();
        if (response) console.log(response);
        setArtistExhb(response?.exhibitions || []);
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setError('Error fetching artist details');
      } finally {
        setLoading(false);
      }
    };
    fetchExhb();
  }, []);

  const handleImageClick = (artist: string | number | boolean) => {
    router.push(`/exhibitions/${encodeURIComponent(artist)}`); // Navigate to dynamic page with artist name in URL
  };
  return (
    <section className='container md:w-[90%] mx-auto'>
      <Center mb={20}>
        <Box>
          <h1 className='md:text-[35px] text-[23px] mt-28 font-[700]'>
            ARTCOLONY’S EXHIBITIONS
          </h1>
          <Group justify='flex-end'>
            <Divider
              size='sm'
              color='#DA3400'
              className='md:w-[14.5rem] w-[9.7rem]'
            />
          </Group>
        </Box>
      </Center>
      {loading && (
        <Center>
          <Loader />
        </Center>
      )}

      {error && (
        <Notification title='Error' color='red'>
          {error}
        </Notification>
      )}

      {!loading && !error && (
        <div className='cursor-pointer'>
          {artistExhb.length === 0 && (
            <p>No current exhibitions. Try again later.</p>
          )}

          {/* Filter and sort exhibitions */}
          {['Current Exhibition', 'Upcoming Exhibition', 'Past Exhibition'].map(
            (status) => (
              <div key={status} className='md:p-0 p-3 md:mt-20 mt-12'>
                <h1 className='font-medium text-xl'>{status.toUpperCase()}</h1>
                <div className='grid md:grid-cols-3 gap-10 mt-5 space-y-10 md:space-y-0'>
                  {artistExhb
                    .filter((exhibition) => {
                      const currentDate = new Date();
                      const startDate = new Date(exhibition.startDate);
                      const endDate = new Date(exhibition.endDate);

                      if (status === 'Current Exhibition') {
                        return (
                          startDate <= currentDate && endDate >= currentDate
                        );
                      } else if (status === 'Upcoming Exhibition') {
                        return startDate > currentDate;
                      } else if (status === 'Past Exhibition') {
                        return endDate < currentDate;
                      }
                    })

                    .map((exhibition) => (
                      <div
                        key={exhibition._id}
                        className='md:grid gap-3' 
                        onClick={() => handleImageClick(exhibition._id)}
                      >
                        <img
                          className='h-[80vh] w-[100%]'
                          src={exhibition.images[0]}
                          alt={exhibition.title}
                        />
                        <div className='font-medium mt-2 md:mt-0'>
                          <h1 className='text-lg'>{exhibition.artist}</h1>
                          <h1 className='text-md'>
                            {exhibition.title.toUpperCase()}
                          </h1>
                          <p className='text-sm'>{exhibition.label}</p>
                          <p className='text-sm'>
                            {format(
                              new Date(exhibition.startDate),
                              'MMMM dd, yyyy'
                            )} - {format(
                              new Date(exhibition.endDate),
                              'MMMM dd, yyyy'
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Exhibitions;
