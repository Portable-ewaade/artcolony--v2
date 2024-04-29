'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Center, Divider, Grid, Loader, Notification } from '@mantine/core';
import { apiExhbPreview } from '../api/ApiServices';
import { IoMdArrowBack } from 'react-icons/io';
import { format } from 'date-fns';
import Link from 'next/link';

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
        if (response) console.log(response.exhibition);
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
    <section className='container md:w-[90%] mx-auto md:pt-32 pt-28'>
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
            <>
              {/* mobile view */}
              <div className='md:hidden flex flex-col space-y-5  p-3'>
                <div className=''>
                  <h1 className='font-bold mb-5 text-xl'>{artistExhb.title}</h1>
                  <h3 className='font-semibold mt-1 mb-2 '>{`${artistExhb?.artists[0].firstName} ${artistExhb?.artists[0].lastName}`}</h3>
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
              </div>

              {/* desktop view  */}
              <div className=' hidden md:grid grid-cols-2 space-x-14'>
                <div className=''>
                  <h1 className='font-bold my-3 text-xl'>{artistExhb.title}</h1>
                  <h3 className='font-semibold mt-1 mb-2 '>{`${artistExhb?.artists[0].firstName} ${artistExhb?.artists[0].lastName}`}</h3>
                  <Divider size='xs' color='#ADADAD' />
                  <p className='text-sm my-2'>
                    {format(new Date(artistExhb.startDate), 'MMMM dd, yyyy')} -{' '}
                    {format(new Date(artistExhb.endDate), 'MMMM dd, yyyy')}
                  </p>
                  <p className='mt-8'>{artistExhb?.description}</p>
                </div>

                <div className=''>
                  <img
                    className=' h-[80%] w-[100%] mb-2'
                    src={artistExhb.images[0]}
                    alt={`artistExhb from ${artistExhb?.title}`}
                  />
                  <Link href='/artists' className='underline text-sm'>
                    VIEW WORKS
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Section2;
