import { Box, Center, Divider, Flex, Text } from '@mantine/core';
import React from 'react';
import TextComponent from './TextComponent';

const Section6 = () => {
  return (
    <>
      <Flex mih={10} mt={70} justify='flex-start' direction='row'>
        <img src='/assets/star.png' alt='star icon' className='w-[30px]' />
      </Flex>
      <section className='container md:w-[90%] mx-auto'>
        <Center className='mb-[1rem] md:mb-[3rem]'>
          <Box>
            <h1 className='md:text-[35px] text-[27px] mt-10 font-[700]'>
              FACE OF ARTCOLONY
            </h1>
            <Divider
              size='sm'
              color='#DA3400'
              className='md:w-[5.5rem] w-[4.5rem]'
            />
          </Box>
        </Center>
        <div className='md:flex flex-row md:space-x-10 md:p-0 p-3'>
          <img
            src='/assets/face.png'
            alt='face of artcolony'
            className='w-[36rem] mb-6'
          />
          <TextComponent />
        </div>
      </section>
    </>
  );
};

export default Section6;
