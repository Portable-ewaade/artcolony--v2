'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from '@mantine/form';

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
  Box,
  Center,
  Divider,
  Group,
  Loader,
  Title,
  Notification,
  Button,
  TextInput,
  Textarea,
} from '@mantine/core';
import { apiWorkGallery } from '../api/ApiServices';

const Contact = () => {
  const [allGallery, setAllGallery] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
  });
  const Responsive: {} = {
    dots: true,

    0: {
      items: 1,
      dots: true,
      margin: 0,
    },
    768: {
      items: 1,
      dots: true,
      margin: 0,
    },
    1024: {
      items: 1,
      dots: true,
      margin: 0,
    },
  };

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      firstName: (value) =>
        value.length < 2 ? 'Please enter your first name' : null,
      lastName: (value) =>
        value.length < 2 ? 'Please enter your last name' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) =>
        value.length < 2 ? 'Please enter your phone number' : null,
      message: (value) =>
        value.length < 2 ? 'Please enter your message' : null,
    },
  });

  return (
    <section className='container md:w-[90%] mx-auto pt-10'>
      <Center mt={90} mb={20}>
        <Box>
          <Title order={1}>CONTACT US</Title>
          <Group justify='flex-start'>
            <Divider size='sm' color='#DA3400' w={150} />
          </Group>
        </Box>
      </Center>
      <OwlCarousel
        responsive={Responsive}
        dots={true}
        animateOut={'fadeOut'}
        autoplay={true}
        autoplaySpeed={300}
        className=' z-0'
      >
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

        {allGallery.map((image, index) => (
          <div className='p-3 md:p-0' key={index}>
            <img className='h-screen' src={image.images[0]} alt={image.title} />
            <div className='my-4 text-center font-bold'>
              <h4 className='text-red'>{image.title}</h4>
            </div>
          </div>
        ))}
      </OwlCarousel>

      <div className='md:grid grid-cols-2 mt-10 md:p-0 p-3'>
        <div className='md:p-0 p-3 md:mb-0 mb-5'>
          <h1 className='text-2xl font-bold mb-5'>CONTACT INFORMATION</h1>
          <h3 className='font-semibold md:text-lg text-xl'>
            No 5, peter adenuga close, <br /> ajibade street, mokola, ibadan
          </h3>
          <h3 className='font-semibold text-lg my-1'>
            <a href='tel:+234123456789'>+234123456789</a>
          </h3>
          <h3 className='font-semibold text-lg underline '>
            <a href='mailto:info@artcolonygallery.com'>
              info@artcolonygallery.com
            </a>
          </h3>

          {/* <Map address='1600 Amphitheatre Parkway, Mountain View, CA' /> */}
        </div>
        <div className='rounded-lg shadow-2xl p-10'>
          <form onSubmit={form.onSubmit(console.log)}>
            <TextInput
              size='md'
              label='First Name'
              my={20}
              placeholder='Enter your first name'
              {...form.getInputProps('firstName')}
            />
            <TextInput
              mt='sm'
              size='md'
              label='Last Name'
              my={20}
              placeholder='Enter your last name'
              {...form.getInputProps('lastName')}
            />
            <TextInput
              mt='sm'
              size='md'
              label='Email Address'
              my={20}
              placeholder='Enter your email address'
              {...form.getInputProps('email')}
            />
            <TextInput
              mt='sm'
              size='md'
              label='Phone Number'
              my={20}
              placeholder='Enter your valid phone number'
              {...form.getInputProps('phone')}
            />
            <Textarea
              mt='sm'
              size='md'
              label='Message'
              my={20}
              placeholder='Send us a message'
              {...form.getInputProps('message')}
            />
            <div className='w-full mt-5 grid'>
              <Button type='submit' mt='sm' size='18px'  h={50} color='#DA3400'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
};

export default Contact;
