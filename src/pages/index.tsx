import React from 'react';
import Banner from '@/components/landing-page/Banner';
import Section2 from '@/components/landing-page/Section2';
import Section3 from '@/components/landing-page/Section3';
import Section4 from '@/components/landing-page/Section4';
import Section5 from '@/components/landing-page/Section5';
import Section6 from '@/components/landing-page/Section6';

const Home: React.FC = () => {
  return (
    <main>
      <Banner />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </main>
  );
};

export default Home;
