import { useState } from 'react';

const TextComponent = () => {
  const initialText =
    'Bola Opadiran, was born in 1974, in Osun State, Nigeria. A seasoned, hardworking, dedicated, prolific and talented mixed media artist who is creatively ingenious in all areas of art. He aims to communicate the complications/complexities of life through a combination of materials. Bola has over the years tried a wide range of materials in his works, materials like sea shells, periwinkle shells, snailshells, wood, jute, plastic, mirror, seeds stones, shoes, leather, sand and so on. He obtained his Bachelor\'s and Master\'s degrees in Obafemi Awolowo University, Ile Ife and University of Ibadan respectively both in the department of Agric-Economics. To him, no barrier is unassailable and his philosophy is "not what you have in your hands that matters, but what you can do with your hands". Bola has affinity/ propensity to break new frontiers and "disobey" some conventional laws. Naturally, he was drawn to art at a tender age. This interest later developed when he was in the University by frequently visiting art department. Also noteworthy is his short stint at Gbolade Omidiran\'s studio (another art phenomenon, an art colossus) during his University days in Ife. Like a colossus, he has delved into impressionism, semi-realism, abstract, marbling, opaism and other areas of art. Bola has to his credit an invention of a unique style he named "Opaism" (coining this from his last name) where pixilated materials are used to make inspiring pieces. Though, he has no formal education in art but his huge talent and undiluted passion for art turned him to a full time artist. What triggered the birth of his style (Opaism) is his appetite to do something different and he started this by turning materials that are meant to be burnt/discarded in his studio into harmonious blends of colorful junks. He enjoys experimenting. Also worthy of note is his gigantic and bold strides in interior and exterior decoration works where he has undeniably etched his name in gold. His unquenchable and voracious appetite for arts doubles him as a successful artist and a proud gallery owner ( Artcolony Gallery) where his works and other artists\' works are showcased. He has the experience as well as portfolio for various accomplishments. Some exhibitions to his name as well and his works are adorning the walls of corporate bodies and some high profile individuals. Bola is happily married. He is also a member of Society Of Nigeria Artists, Lagos Chapter.';

  const [text, setText] = useState(initialText);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='max-auto'>
      <p className='text-gray-800 '>
        {isExpanded ? text : text.slice(0, 1805)}
        {/* Show first 200 characters */}
        {!isExpanded && text.length > 200 && (
          <button
            onClick={toggleExpand}
            className='underline focus:outline-none block mt-2'
          >
            Read More
          </button>
        )}
        {isExpanded && (
          <button
            onClick={toggleExpand}
            className='underline focus:outline-none block mt-2'
          >
            Read Less
          </button>
        )}
      </p>
    </div>
  );
};

export default TextComponent;
