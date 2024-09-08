//import Head from "next/head";
//import Image from "next/image";
//import { Inter } from "next/font/google";
//import styles from "@/styles/Home.module.css";
import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
//import Footer from "@/components/Footer/Footer";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import HomePageHero from "@/components/HomePage/HomePageHero/HomePageHero";
import HomePageSlider from "@/components/HomePage/HomePageSlider/HomePageSlider";
import React, {useState} from 'react'
import exampleCardImage from '../components/HomePage/assets/exampleCardImage.png'
import GoodsArea from "@/components/HomePage/GoodsArea/GoodsArea";
import { GoodsArr } from "@/components/HomePage/GoodsArea/GoodsArea.typings";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSSRMobile: getIsSsrMobile(context),
    },
  };
}

//const inter = Inter({ subsets: ["latin"] });


export default function Home({
  isSSRMobile
}: {
  isSSRMobile: boolean
}) {

  const isMobile = isSSRMobile

  const [goodsArr, setGoodsArr] = useState<GoodsArr[]>([
    {
      id:1,
      title:'Эти товары часто покупают',
      isSeeAll:false,
      goodsCard:[
        {
          id:1,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:true,
        },
        {
          id:2,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:3,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:4,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:5,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:6,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:7,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
      ]
    },
    {
      id:2,
      title:'Готовые товары',
      isSeeAll:true,
      goodsCard:[
        {
          id:1,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:2,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:3,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:4,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:5,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:6,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:7,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
      ]
    },
    {
      id:3,
      title:'Съедобные букеты',
      isSeeAll:true,
      goodsCard:[
        {
          id:1,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:2,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:3,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:4,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:5,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:6,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
        {
          id:7,
          title:'Упаковка “Клубника в шоколаде”',
          image:exampleCardImage,
          rating:4.5,
          reviewsNumber:124,
          oldPrice:4400,
          currentPrice:3300,
          isFavourite:false,
        },
      ]
    },
  ])

  return (
    <>
      <PageLayout
        isMobile={isMobile}
        title='Главная'
        description='description'
        pageType={PageType.main}
      >
        {!isMobile && <HomePageHero />}
        <HomePageSlider isMobile={isMobile}/>
        <GoodsArea goodsArr={goodsArr} isMobile={isMobile} />
      </PageLayout>
    </>
  );
}
