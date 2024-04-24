'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  apiArtistArtwork,
  apiArtistExhb,
  apiArtistSingle,
} from '@/pages/api/ApiServices';
import { Box, Center, Loader, Notification, Tabs } from '@mantine/core';
import { IoMdArrowBack } from 'react-icons/io';

const ArtistPage = () => {
  const [artistArtwork, setArtistArtwork] = useState<Artist[]>([]);
  const [singleArtist, setSingleArtist] = useState<SingleArtist>();
  const [artistExhb, setArtistExhb] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const { id } = router.query;

  // artist artworks
  useEffect(() => {
    const fetchArtistArtwork = async () => {
      try {
        const response = await apiArtistArtwork(id as string);
        if (response) console.log(response);
        setArtistArtwork(response.works || []);
      } catch (error) {
        console.error('Error fetching artist Artwork:', error);
        setError('Error fetching artist Artwork');
      } finally {
        setLoading(false);
      }
    };
    fetchArtistArtwork();
  }, []);

  // artist exhb
  useEffect(() => {
    const fetchArtistExhibition = async () => {
      try {
        const response = await apiArtistExhb(id as string);
        if (response) console.log(response);
        setArtistExhb(response.exhibitions || []);
      } catch (error) {
        console.error('Error fetching artist Exhibition:', error);
        setError('Error fetching artist Exhibition');
      } finally {
        setLoading(false);
      }
    };
    fetchArtistExhibition();
  }, []);

  // artist  single bio
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await apiArtistSingle(id as string);
        console.log(response);
        if (response.success) {
          setSingleArtist(response.artist);
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
    fetchBio();
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <section className='container md:w-[91%] mx-auto pt-28'>
      <Box>
        <h1 className='ps-3 mb-6 cursor-pointer' onClick={handleBackClick}>
          <IoMdArrowBack size={25} />
        </h1>
        {loading && (
          <Center mt={20}>
            <Loader />
          </Center>
        )}
        {!loading && !error && (
          <div>
            <h1 className='font-bold text-2xl my-8 ms-4'>{`${singleArtist?.firstName.toLocaleUpperCase()} ${singleArtist?.lastName.toLocaleUpperCase()}`}</h1>
          </div>
        )}

        <Tabs defaultValue='ARTWORKS' color='#DA3400'>
          <Tabs.List>
            <Tabs.Tab value='ARTWORKS'>ARTWORKS</Tabs.Tab>
            <Tabs.Tab value='BIOGRAPHY'>BIOGRAPHY</Tabs.Tab>
            <Tabs.Tab value='EXHIBITIONS'>EXHIBITIONS</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='ARTWORKS'>
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
              <>
                <p className='text-sm font-semibold mx-4 mt-8'> {artistArtwork?.length} Artworks</p>
                <div className='md:grid md:grid-cols-3 gap-8 h-auto md:p-0 p-3'>
                  {artistArtwork?.map((artist, _id) => (
                    <div key={_id} className='item mt-2 mb-14 md:mb-0'>
                      <img
                        className='h-[75%] w-[100%]'
                        src={artist.images[0]}
                      />
                      <h3 className='font-bold my-1'>{artist.title}</h3>
                      <div className='text-sm font-medium'>
                        <p className='my-2'>{artist.materials}</p>
                        <p className='my-2'>{artist.firstName}</p>
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
                    </div>
                  ))}
                </div>
              </>
            )}
          </Tabs.Panel>

          <Tabs.Panel value='BIOGRAPHY'>
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
              <div className='p-3 md:p-0'>
                <div className='item mt-5'>
                  <img
                    src={singleArtist?.image}
                    alt=''
                    className='mt-5 mb-8 h-auto w-auto'
                  />
                  <p className='my-7'>{singleArtist?.fullBiography}</p>
                </div>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value='EXHIBITIONS'>
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
              <div className=''>
                {artistExhb.length === 0 && (
                  <p>No current exhibitions. Try again later.</p>
                )}

                {/* Filter and sort exhibitions */}
                {[
                  'Current Exhibition',
                  'Upcoming Exhibition',
                  'Past Exhibition',
                ].map((status) => (
                  <>
                    {artistExhb?.filter((exhibition) => {
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
                      })?.map((exhibition) => (
                        <div key={exhibition._id} className='md:p-0 p-3'>
                          <h1 className='font-medium text-xl md:mt-16 mt-8'>
                            {status.toLocaleUpperCase()}
                          </h1>
                          <div className='item mt-5 md:grid grid-cols-3 gap-10 '>
                            <img
                              className=''
                              src={exhibition.images[0]}
                              alt={exhibition.title}
                            />
                            <div className=' font-medium my-auto'>
                              <h1 className='my-4 text-lg'>
                                {exhibition.artist}
                              </h1>
                              <h1 className='my-4 text-md'>
                                {exhibition.title.toLocaleUpperCase()}
                              </h1>
                              <p className='my-4 text-sm'>{exhibition.label}</p>
                              <p className='my-4 text-sm'>
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
                        </div>
                      ))}
                  </>
                ))}
              </div>
            )}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </section>
  );
};

export default ArtistPage;
