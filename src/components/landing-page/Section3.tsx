import {
  Center,
  Text,
  Box,
  Group,
  Divider,
  Flex,
} from '@mantine/core';
import React from 'react';

const Section3 = () => {
  return (
    <>
      <Flex mih={10} justify='flex-end' direction='row'>
        <img src='/assets/star.png' alt='star icon' className='w-[30px]' />
      </Flex>
      <section className='container md:w-[90%] mx-auto p-3 md:p-0 mt-12 md:mt-0'>
        <Center mb={20}>
          <Box>
            <h1 className='md:text-[35px] text-[27px] font-[700]'>
              WHAT IS ARTCOLONY?
            </h1>
            <Group justify='flex-end' pe={12}>
              <Divider
                size='sm'
                color='#DA3400'
                className='md:w-[14.5rem] w-[11rem]'
              />
            </Group>
          </Box>
        </Center>
        <Box className=''>
          <Text className='my-5'>
            Artcolony Gallery came into existence in the year 2009 in Ibadan,
            Oyo State, Nigeria, and it conducts its business at two strategic
            locations in the boisterous city of Ibadan. 5, Awolowo Avenue, Old
            Bodija Estate and 5, Peter Adenuga Close, Obasa/Sanusi Street,
            Behind Coca Cola depot, Ajibade Area, Ibadan.
          </Text>
          <p className='my-5'>
            The gallery is in the forefront of showcasing and unveiling the
            artistic talents and 'jewels' to its teeming customers and clients
            with an enviable track record of almost two decades. We are poised
            and equipped with highly skilled artists required to 'quench' the
            thirst and deliver the needs of the art aficionados.
          </p>
          <p className='my-5'>
            Artcolony Gallery is a repository of beautiful paintings,
            sculptures, and mixed media works and a whole lot of
            un-put-down-able artistic creations. Therefore, it is not out of
            lines to conclude that the gallery is home to contemporary African
            art. Emerging artists as well as the masters who know their onions,
            when it comes to art have their works being displayed and showcased
            in the gallery.
          </p>
          <p className='my-5'>
            Owing to its richness in artworks and depth in terms of stock; the
            gallery constantly attracts art connoisseurs, art buyers and art
            enthusiasts all over the world. Artcolony Gallery has continuously
            met the growing demands of art lovers over time by intentionally
            infusing different artists with their different 'magic wands' into
            the list of its in-house artists. Through the process of continuous
            re-invention and focusing on the fundamentals of good artistic
            delivery and supply, we make bold to say that you cannot go wrong
            dealing with us.
          </p>
          <p className='my-5'>
            For close to two decades of our existence, we have continued to
            build strong and open relationships with our esteemed customers and
            alliances... and also with our artists that have been strategic to
            our richness, depth and growth. Artcolony Gallery, over the years
            has built enduring and successful relationship with both the local
            and foreign art communities.
          </p>
          <p className='my-5'>
            In continuation of this success story, we appeal to you to patronize
            and partner with us. Artcolony Gallery is a place to visit when
            thinking about art.
          </p>
        </Box>
      </section>
    </>
  );
};

export default Section3;
