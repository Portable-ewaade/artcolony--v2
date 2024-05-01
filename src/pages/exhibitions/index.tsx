import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Divider,
  Group,
  Loader,
  Notification,
  Pagination,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { apiAllExhb } from '../api/ApiServices';
import { format } from 'date-fns';

const Exhibitions = () => {
  const [artistExhb, setArtistExhb] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
const [currentExhbPage, setCurrentExhbPage] = useState(1);
const [upcomingExhbPage, setUpcomingExhbPage] = useState(1);   
//  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 1; // Display one exhibition per page
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

  const filteredExhbByStatus = (status : any) => {
    const currentDate = new Date();
    return artistExhb.filter((exhibition) => {
      const startDate = new Date(exhibition.startDate);
      const endDate = new Date(exhibition.endDate);
      if (status === 'current') {
        return startDate <= currentDate && endDate >= currentDate;
      } else if (status === 'upcoming') {
        return startDate > currentDate;
      }
      return endDate < currentDate; // For past exhibitions
    });
  };

  const totalCurrentExhb = filteredExhbByStatus('current').length;
  const totalUpcomingExhb = filteredExhbByStatus('upcoming').length;

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
          {/* Render exhibitions for current status */}
          <RenderExhibitions status='current' />
          {/* Render exhibitions for upcoming status */}
          <RenderExhibitions status='upcoming' />
          {/* Render past exhibitions in grid format */}
          <div className='md:p-0 p-3 md:mt-20 mt-12'>
            <h1 className='font-medium text-xl'>PAST EXHIBITIONS</h1>
            <div className='grid md:grid-cols-3 gap-10 mt-5 space-y-10 md:space-y-0'>
              {filteredExhbByStatus('past').map((exhibition) => (
                <div
                  key={exhibition._id}
                  className='md:grid gap-3'
                  onClick={() => handleImageClick(exhibition._id)}
                >
                  <img
                    className='h-[50vh] md:h-[70vh] w-[100%]'
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
                      {format(new Date(exhibition.startDate), 'MMMM dd, yyyy')}{' '}
                      - {format(new Date(exhibition.endDate), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
function RenderExhibitions({ status }: any) {
  const exhibitions =
    status === 'current'
      ? filteredExhbByStatus('current')
      : filteredExhbByStatus('upcoming');

  const currentPage = status === 'current' ? currentExhbPage : upcomingExhbPage;

  return (
    <div key={status} className='md:p-0 p-3 md:mt-20 mt-12'>
      <h1 className='font-medium text-xl'>
        {status.toUpperCase()} EXHIBITIONS
      </h1>
      <div className='space-y-10 md:space-y-0'>
        {exhibitions
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((exhibition) => (
            <div key={exhibition._id} className='md:grid grid-cols-3 gap-10'>
              <div>
                {' '}
                <img
                  className='h-[50vh] md:h-[70vh] w-[100%]'
                  src={exhibition.images[0]}
                  alt={exhibition.title}
                  onClick={() => handleImageClick(exhibition._id)}
                />
              </div>
              <div className='font-medium mt-2 md:mt-[23rem]'>
                <h1 className='text-lg'>{exhibition.artist}</h1>
                <h1 className='text-md'>{exhibition.title.toUpperCase()}</h1>
                <p className='text-sm'>{exhibition.label}</p>
                <p className='text-sm my-3'>
                  {format(new Date(exhibition.startDate), 'MMMM dd, yyyy')} -{' '}
                  {format(new Date(exhibition.endDate), 'MMMM dd, yyyy')}
                </p>
                <Pagination
                  total={
                    status === 'current' ? totalCurrentExhb : totalUpcomingExhb
                  }
                  value={currentPage}
                  color='#DA3400'
                  radius='lg'
                  mt={30}
                  px={0}
                  styles={{
                    control: {
                      margin: '6px',
                    },
                  }}
                  onChange={(value) =>
                    status === 'current'
                      ? setCurrentExhbPage(value)
                      : setUpcomingExhbPage(value)
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

};

export default Exhibitions;
