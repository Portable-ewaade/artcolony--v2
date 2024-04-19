import { apiAllExhb } from '@/pages/api/ApiServices';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Loader,
  Notification,
} from '@mantine/core';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Section5 = () => {
  const [featuredExhb, setFeaturedExhb] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [artistExhb, setArtistExhb] = useState<Exhibition[]>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await apiAllExhb();
        if (response) console.log(response);
        setFeaturedExhb(response.exhibitions || []);
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setError('Error fetching artist details');
      } finally {
        setLoading(false);
      }
    };
    fetchArtistDetails();
  }, []);

  useEffect(() => {
    const fetchArtistExhibition = async () => {
      try {
        const response = await apiAllExhb();
        if (response) console.log(response.exhibitions);
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

  return (
    <>
      <Flex
        mih={10}
        className='mt-0 md:mt-16'
        justify='flex-end'
        direction='row'
      >
        <img src='/assets/star.png' alt='star icon' className='w-[30px]' />
      </Flex>
      <section className='container md:w-[90%] mx-auto'>
        <Center>
          <Box>
            <h1 className='md:text-[35px] text-[30px] mt-10 font-[700]'>
              FEATURED EXHIBITIONS
            </h1>

            <Group justify='flex-end'>
              <Divider
                size='sm'
                color='#DA3400'
                className='md:w-[13.5rem] w-[11.5rem]'
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
          <div className='grid md:grid-cols-3 md:gap-10'>
            {artistExhb.length === 0 && (
              <p>No current exhibitions. Try again later.</p>
            )}
            {['Current Exhibition'].map((status) => (
              <>
                {artistExhb
                  .filter((exhibition) => {
                    const currentDate = new Date();
                    const startDate = new Date(exhibition.startDate);
                    const endDate = new Date(exhibition.endDate);

                    if (status === 'Current Exhibition') {
                      return startDate <= currentDate && endDate >= currentDate;
                    } else if (status === 'Upcoming Exhibition') {
                      return startDate > currentDate;
                    } else if (status === 'Past Exhibition') {
                      return endDate < currentDate;
                    }
                  })
                  .slice(0, 3)
                  .map((exhibition) => (
                    <div
                      key={exhibition._id}
                      className='mt-3 md:mt-5 p-3 md:p-0'
                    >
                      <div>
                        <img
                          className='h-[70vh] w-[100%]'
                          src={exhibition.images[0]}
                          alt={exhibition.title}
                        />
                        <div className=' font-medium my-auto'>
                          <h1 className='my-4 text-lg'>{exhibition.artist}</h1>
                          <h1 className='my-4 text-md'>
                            {exhibition.title.toLocaleUpperCase()}
                          </h1>
                          <p className='my-4 text-sm'>{exhibition.label}</p>
                          <p className='my-4 text-sm'>
                            {format(
                              new Date(exhibition.startDate),
                              'MMMM dd, yyyy'
                            )}{' '}
                            -{' '}
                            {format(
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

        {/* <div className='grid grid-cols-3 gap-6'>
          {exbImg.map((image, index) => (
            <div className=' item mt-10 ' key={index}>
              <img className='' src={image.src} alt={image.title} />
              <h3 className='font-bold my-3'>{image.artist}</h3>
              <div className='text-sm font-medium'>
                <p>{image.title}</p>
                <p>{image.imgType}</p>
                <p>{image.size}</p>
                <p>{image.imgType}</p>
              </div>
            </div>
          ))}
        </div> */}
        <Center className='mt-[1.5rem] md:mt-[4rem]'>
          <Button
            variant='transparent'
            color='black'
            td='underline'
            display='block'
            px={0}
            component='a'
            href='/exhibitions'
          >
            View All Our Exhibitions
          </Button>
        </Center>
      </section>
    </>
  );
};

export default Section5;
