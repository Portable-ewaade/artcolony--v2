'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Center, Divider, Loader, Notification } from '@mantine/core';
import { apiExhbPreview } from '../api/ApiServices';
import { IoMdArrowBack } from 'react-icons/io';
import { format } from 'date-fns';

const Section2 = () => {
  const [artistExhb, setArtistExhb] = useState<Exhibition>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchExhbDetails = async () => {
      try {
        const response = await apiExhbPreview(id as string);
        if (response) console.log(response);
        setArtistExhb(response?.exhibition);
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setError('Error fetching artist details');
      } finally {
        setLoading(false);
      }
    };
    fetchExhbDetails();
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <section className='container md:w-[90%] mx-auto pt-32'>
      <h1 className=' mb-6 cursor-pointer' onClick={handleBackClick}>
        <IoMdArrowBack size={25} />
      </h1>

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
        <div>
          {artistExhb && (
            <div className='item mt-5 flex flex-col md:flex-row md:space-x-20 space-y-8 md:space-y-0 md:p-0 p-3'>
              <div className=''>
                <h1 className='font-bold my-3 text-xl'>{artistExhb.title}</h1>
                <Divider size='xs' color='#ADADAD' />
                <p className='text-sm my-2'>
                  {format(new Date(artistExhb.startDate), 'MMMM dd, yyyy')} -{' '}
                  {format(new Date(artistExhb.endDate), 'MMMM dd, yyyy')}
                </p>
                {/* image on the mobile view */}
                <img
                  className=' md:hidden mt-6'
                  src={artistExhb.images[0]}
                  alt={`artistExhb from ${artistExhb?.title}`}
                />
                <p className='mt-8'>{artistExhb?.description}</p>
              </div>
              {/* image on the desktop view */}
              <img
                className='hidden md:block md:h-[30%] md:w-[50%]'
                src={artistExhb.images[0]}
                alt={`artistExhb from ${artistExhb?.title}`}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Section2;
