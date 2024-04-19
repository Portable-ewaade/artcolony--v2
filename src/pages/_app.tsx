import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <MantineProvider>
        <Navbar />
        <Component {...pageProps} />;
        <Footer />
        </MantineProvider>
}
