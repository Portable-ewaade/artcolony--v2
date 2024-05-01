'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { FaAlignJustify, FaX } from 'react-icons/fa6';
import Link from 'next/link';
import { linkData, linkDataMobile } from '@/data/mockData';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
interface Link {
  title: string;
  url: string;
}

export default function Navigate() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDisclosure = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Disclosure
      as='nav'
      className='z-10 fixed w-full bg-white pt-0 md:shadow-xl'
    >
      {({ open }) => (
        <section className='container md:w-[91%] mx-auto'>
          <div className='px-3 md:px-0'>
            <div className='relative flex h-20 items-center justify-between'>
              <div className='flex flex-1 items-center'>
                <Link href='/'>
                  <img
                    className='h-12 w-auto my-1'
                    src='/assets/nav-logo.png'
                    alt='motive health logo'
                  />
                </Link>
              </div>

              <div className='flex items-center sm:hidden'>
                {/* Mobile menu button*/}

                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white z-20'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <FaX
                      className='block h-6 w-6 border-0'
                      color='#ffff'
                      aria-hidden='true'
                    />
                  ) : (
                    <FaAlignJustify
                      className='block h-6 w-6'
                      color='#000'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>

              <div className='flex flex-shrink-0 items-center justify-center sm:items-stretch sm:justify-start '>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {linkData.map((link, index) => (
                      <ul className='nav-item ' key={index}>
                        {link && (
                          <Link
                            href={link.url}
                            className={`font-[550] text-[#02021C] mx-3 hover:text-[#DA3400] active:text-[#DA3400] link ${
                              pathname === link.url
                                ? 'active text-[#DA3400]'
                                : ''
                            }`}
                          >
                            {link.title}
                          </Link>
                        )}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='z-50'>
            <div className='space-y-10 px-2 pb-3 pt-32 h-screen text-white w-2/3 end-0 top-0 absolute bg-gradient-to-r from-[#DA3400] to-[#892303]  disclosure'>
              {linkDataMobile.map((link, index) => (
                <ul className='' key={index}>
                  {link && (
                    <Link
                      href={link.url}
                      className={`font-[550] mx-3 md:hover:text-[#DA3400] text-lg link pl-4 ${
                        pathname === link.url
                          ? 'active bg-slate-100 pr-20 pl-5 py-3.5 h-20  rounded-3xl text-[#DA3400]'
                          : ''
                      }`}
                      passHref
                      onClick={toggleDisclosure}
                    >
                      {link.title}
                    </Link>
                  )}
                </ul>
              ))}
            </div>
          </Disclosure.Panel>
        </section>
      )}
    </Disclosure>
  );
}
