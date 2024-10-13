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


const exampleVideo = '/centrzrenija_desktop.mp4'

export const goodsArr:GoodsArr[] = [
  {
    id:1,
    slug:'Klubnichnie-boxi',
    title:'Эти товары часто покупают',
    isSeeAll:false,
    goodsCard:[
      {
        id:1,
        slug:'strawberryInChocolate1',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleVideo, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.3,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:true,
        dimensions:[10, 20],
        availableConfirm: new Date('2024-01-01:15:25'),
        type:'Монобукеты',
        composition:[
          {
            id:1,
            title:'Клубника в шоколаде',
            value:12,
            unit:'шт.'
          },
          {
            id:2,
            title:'Упаковка под конфету',
            value:12,
            unit:'шт.'
          },
          {
            id:3,
            title:'Упаковка (бокс)',
            value:1,
            unit:'шт.'
          },
          {
            id:4,
            title:'Упаковка (бокс)',
            value:1,
            unit:'шт.'
          },
          {
            id:5,
            title:'Упаковка (бокс)',
            value:1,
            unit:'шт.'
          },
          {
            id:6,
            title:'Упаковка (бокс)',
            value:1,
            unit:'шт.'
          },
        ],
        reviews:[
          {
            id:1,
            name:'Евгений',
            avatar:null,
            date: new Date('2024-09-24'),
            rates:[5, 5, 5, 5],
            images:[
              exampleCardImage,
              exampleCardImage
            ]
          },
          {
            id:2,
            name:'Евгений',
            avatar:null,
            date: new Date('2024-09-24'),
            rates:[4, 5, 4, 5],
            images:[
              exampleCardImage,
              exampleCardImage
            ]
          },
          {
            id:3,
            name:'Евгений',
            avatar:null,
            date: new Date('2024-09-24'),
            rates:[5, 5, 1, 5],
            images:[
              exampleCardImage,
              exampleCardImage
            ]
          },
        ]
      },
      {
        id:2,
        slug:'strawberryInChocolate2',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монобукеты',
      },
      {
        id:3,
        slug:'strawberryInChocolate3',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Стереобукеты',
      },
      {
        id:4,
        slug:'strawberryInChocolate4',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Стереобукеты',
      },
      {
        id:5,
        slug:'strawberryInChocolate5',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Стереобукеты',
      },
      {
        id:6,
        slug:'strawberryInChocolate6',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Небукеты',
      },
      {
        id:7,
        slug:'strawberryInChocolate7',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Простобукеты',
      },
    ]
  },
  {
    id:2,
    slug:'gotovie-tovari',
    title:'Готовые товары',
    isSeeAll:true,
    goodsCard:[
      {
        id:1,
        slug:'strawberryInChocolate8',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Стереобукеты',
      },
      {
        id:2,
        slug:'strawberryInChocolate9',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:3,
        slug:'strawberryInChocolate10',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:4,
        slug:'strawberryInChocolate11',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:5,
        slug:'strawberryInChocolate12',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:6,
        slug:'strawberryInChocolate13',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:7,
        slug:'strawberryInChocolate14',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
    ]
  },
  {
    id:3,
    slug:'sedobnije-bucketi',
    title:'Съедобные букеты',
    isSeeAll:true,
    goodsCard:[
      {
        id:1,
        slug:'strawberryInChocolate15',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:2,
        slug:'strawberryInChocolate16',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:3,
        slug:'strawberryInChocolate17',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:4,
        slug:'strawberryInChocolate18',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:5,
        slug:'strawberryInChocolate19',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:6,
        slug:'strawberryInChocolate20',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
      {
        id:7,
        slug:'strawberryInChocolate21',
        title:'Упаковка “Клубника в шоколаде”',
        images:[exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
        rating:4.5,
        reviewsNumber:124,
        oldPrice:4400,
        currentPrice:3300,
        isFavourite:false,
        availableConfirm: new Date('2024-01-01:20:25'),
        type:'Монообукеты',
      },
    ]
  },
]

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSSRMobile: getIsSsrMobile(context),
    },
  };
}

export default function Home({
  isSSRMobile
}: {
  isSSRMobile: boolean
}) {

  const isMobile = isSSRMobile


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
