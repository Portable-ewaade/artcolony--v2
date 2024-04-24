declare namespace Navbar {
  interface Link {
    url: string;
    title: string;
  }
}

interface ExhibitionBase {
  _id: string;
  title: string;
  createdAt: string;
  images: string[];
  isFeatured: boolean;
}

interface Exhibition extends ExhibitionBase {
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  artists: string[];
  exhibitions: any
  __v: number;
  label: string;
  artist: string;
}

interface ExhibitionPreview extends ExhibitionBase {
  artist: string;
  label: string;
  imgType: string;
}

interface FeaturedArtwork extends ExhibitionBase {
  year: string;
  dimensionLengthInCM: string;
  dimensionWidthInCM: string;
  artist: string;
  categories: string[];
  isOurWork: boolean;
  materials: string[];
  previewImage: string;
  __v: number;
}

interface ArtistBase {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  previewImageWork: string;
  isSigned: boolean;
  dob: string;
  images: string[];
  fullBiography: string;
  works: any[];
  exhibitions: any[];
  createdAt: string;
  __v: number;
}

interface Artist extends ArtistBase {
  materials: string;
  title: string;
  categories: string[];
  dimensionLengthInCM: any;
  dimensionWidthInCM: any;
  success: any;
  message: string | undefined;
  artist: any;
}

interface SingleArtist extends ArtistBase {
  works: any;
  success: any;
  message: string;
  artist: any;
  fullBiography: ReactNode;
  categories: string[];
  dimensionLengthInCM: string;
  dimensionWidthInCM: string;
  image: string;
  isOurWork: boolean;
  materials: string[];
  previewImage: string;
  year: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
