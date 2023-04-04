import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { Main } from "../components/Main";
import { Pixel } from "../services/pixel";

const Home: NextPage = () => {
  useEffect(() => {
    Pixel().then((fbPixel) => {
      console.log("page view");
      fbPixel.pageView();
    });
  }, []);

  return (
    <>
      <Head>
        <title>Next Academy Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/checkout-unbk/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <Main />
    </>
  );
};

export default Home;
