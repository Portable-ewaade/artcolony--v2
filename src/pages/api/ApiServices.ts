import { fetchData } from './MainServices';

// featured artist
export async function apiFeaturedArtwork() {
  return fetchData<FeaturedArtwork>({
    url: '/home/featured-artwork',
    method: 'get',
  });
}
// get all artist
export async function apiArtist() {
  return fetchData<Artist>({
    url: '/artist',
    method: 'get',
  });
}
// get single artist
export async function apiArtistSingle(artistId: string) {
  return fetchData<SingleArtist>({
    url: `/artist/${artistId}`,
    method: 'get',
  });
}
// get artist artwork
export async function apiArtistArtwork(artistId: string) {
  return fetchData<Artist>({
    url: `/work/artists/${artistId}`,
    method: 'get',
  });
}
// get single artist exhibition
export async function apiArtistExhb(artistId: string) {
  return fetchData<Exhibition>({
    url: `/exhibition/artists/${artistId}`,
    method: 'get',
  });
}

// get all exhibition
export async function apiAllExhb() {
  return fetchData<Exhibition>({
    url: `/exhibition`,
    method: 'get',
  });
}
// get exhibition details
export async function apiExhbPreview(_id: string) {
  return fetchData<Exhibition>({
    url: `/exhibition/${_id}`,
    method: 'get',
  });
}
// get all work gallery
export async function apiWorkGallery() {
  return fetchData<Exhibition>({
    url: `/work`,
    method: 'get',
  });
}
