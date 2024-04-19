import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/contact.module.css';

const Message = ({ title, buttonText }:any ) => {
  useEffect(() => {}, []);

  return (
    <section
      className='grid-container'
      style={{
        height: '100vh',
        marginTop: '10rem',
      }}
    >
      <main className={` ${styles.contact_banner}`}>
        <div
          style={{
            backgroundColor: '#fff' ? '#fff' : '',
            padding: '0.5rem 0.5rem' ? '0.5rem 0.5rem' : '',
            // borderRadius: "1.5rem" ? "1.5rem" : "",
          }}
          className=''
        >
          <div className=' text-center'>
            <h3 className='fw-bold'>{title}</h3>
            <p className=''>
              Our team of experts will get in touch with you in no time.
            </p>
            <div className='w-75 mx-auto lag-btnn'>
              <Link href='/' className='text-white fs-small '>
                {buttonText ? buttonText : 'Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Message;
