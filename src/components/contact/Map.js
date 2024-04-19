// import { useEffect, useRef, useMemo } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// function Map({ address }) {
//   const mapRef = useRef(null);
// //   const geocoder = useMemo(() => new google.maps.Geocoder(), []);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//       version: 'weekly', // Consider specifying a specific version if needed
//     });

//     loader
//       .load()
//       .then(() => {
//         geocoder.geocode({ address: address }, (results, status) => {
//           if (status === 'OK') {
//             const map = new google.maps.Map(mapRef.current, {
//               center: results[0].geometry.location,
//               zoom: 8,
//             });
//             new google.maps.Marker({
//               map: map,
//               position: results[0].geometry.location,
//             });
//           } else {
//             console.error(
//               `Geocode was not successful for the following reason: ${status}`
//             );
//             // You might want to handle this error more gracefully
//           }
//         });
//       })
//       .catch((error) => {
//         console.error('Error loading Google Maps API:', error);
//         // Handle API loading error
//       });
//   }, [address, geocoder]);

//   return <div style={{ height: '400px' }} ref={mapRef} />;
// }

// export default Map;

import React from 'react'

const Map = () => {
  return (
    <div>
      google map
    </div>
  )
}

export default Map

