import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import {
  Divider,
} from '@mantine/core';

const Footer = () => {
  return (
    <section className='container md:w-[90%] mx-auto my-20'>
      <Divider my='xl' size='xs' className='mx-3 md:mx-0' color='#DA3400' />
      <div className='grid grid-cols-3 md:grid-cols-6 relative md:gap-20 p-3 md:p-0'>
        <div className='col-span-2 md:col-span-5'>
          <Link href='/'>
            <img src='/assets/nav-logo.png' alt='a & co' className='h-12' />
          </Link>
        </div>

        <div className='flex flex-row md:space-x-3 space-x-2 mt-3'>
          <Link href='#'>
            <h1 className='md:text-[2rem] text-[1.5rem]'>
              <AiFillInstagram />
            </h1>
          </Link>

          <Link href='#' className=''>
            <h1 className='md:text-[2rem] text-[1.5rem]'>
              <FaXTwitter />
            </h1>
          </Link>

          <Link href='#' className=''>
            <h1 className='md:text-[2rem] text-[1.5rem]'>
              <FaFacebook />
            </h1>
          </Link>

          <Link href='#' className=''>
            <h1 className='md:text-[2rem] text-[1.5rem]'>
              <FaLinkedin />
            </h1>
          </Link>
        </div>
      </div>

      <div className='md:mt-10 mt-5 p-3 md:p-0'>
        <p className='font-semibold text-xs text-center md:text-start text-color'>
          ARTCOLONY GALLERY COPYRIGHT &copy; {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default Footer;
