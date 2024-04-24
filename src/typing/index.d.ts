declare namespace Navbar {
  interface link {
    url: string;
    title: string;
  }
}
interface CurrentExhibition {
  artist: string;
  src: string;
  title: string;
  label: string;
  date: string;
  id: number;
}

interface ExhibitionPreview {
  id: string;
  artist: string;
  src: string;
  title: string;
  label: string;
  imgType: string;
}

type Exhibition = {
  exhibition: any;
  exhibitions: any[];
  artist: ReactNode;
  label: ReactNode;
  categories: string[];
  dimensionLengthInCM: string;
  dimensionWidthInCM: string;
  fullBiography: string;
  success: any;
  works: any;
  message: string | undefined;
  _id: string;
  startDate: string;
  endDate: string;
  title: string;
  images: string[];
  isFeatured: boolean;
  artists: string[];
  type: string;
  description: string;
  createdAt: string;
  __v: number;
  previewImage: string;
};

interface Artist {
  materials: string;
  title: string;
  categories: string[];
  dimensionLengthInCM: any;
  dimensionWidthInCM: any;
  success: any;
  artists: never[];
  message: string | undefined;
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

interface SingleArtist {
  works: any;
  success: any;
  message: string;
  fullBiography: ReactNode;
  lastName: ReactNode;
  categories: string[];
  createdAt: string;
  dimensionLengthInCM: string;
  dimensionWidthInCM: string;
  image: string;
  isFeatured: boolean;
  isOurWork: boolean;
  materials: string[];
  previewImage: string;
  title: string;
  year: string;
  __v: number;
  _id: string;
  images: string[];
  artist: any;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// // Define the FeaturedArtwork interface
interface FeaturedArtwork {
  _id: string;
  title: string;
  year: string;
  dimensionLengthInCM: string;
  dimensionWidthInCM: string;
  artist: string;
  categories: string[];
  createdAt: string;
  images: string[];
  isFeatured: boolean;
  isOurWork: boolean;
  materials: string[];
  previewImage: string;
  __v: number;
  featuredArtworks: FeaturedArtwork[{}];
}

interface Exhibition {
  _id: string;
  title: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  isFeatured: boolean;
  images: string[];
  artists: string[];
  __v: number;
}
