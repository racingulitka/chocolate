import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import React, { useState } from 'react'
import HelpBreadCrumbs from "@/components/Help/HelpBreadCrumbs/HelpBreadCrumbs";
import HelpMain from "@/components/Help/HelpMain/HelpMain";
import { HelpArr } from "@/components/Help/HelpMain/HelpMain.typings";

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

  const [helpArr] = useState<HelpArr[]>([
    {
      id:1,
      chapterTitle:'Частые вопросы',
      articles:[
        {
          id:1,
          articleTitle:'Как зарегистрироваться и разместить свои товары?',
        },
        {
          id:2,
          articleTitle:'Как оформить заказ?',
        },
        {
          id:3,
          articleTitle:'Какой статус у моего заказа?',
        },
        {
          id:4,
          articleTitle:'Как можно оплатить заказ?',
        },
        {
          id:5,
          articleTitle:'Когда смогут доставить?',
        },
        {
          id:6,
          articleTitle:'Участвуете ли вы в благотворительности?',
        },
        {
          id:7,
          articleTitle:'Проблема с авторизацией',
        },
      ]
    },
    {
      id:2,
      chapterTitle:'Оплата',
    },
    {
      id:3,
      chapterTitle:'Доставка',
      articles:[
        {
          id:1,
          articleTitle:'Возможна доставка на ближайшее время?',
          articleText:'Среди товаров, представленных на Flowwow, всегда есть те, которые могут быть доставлены в максимально короткие сроки — от 30 минут с момента оформления заказа. Чтобы увидеть только такие товары, воспользуйтесь фильтрами «Менее 90 мин.» или «Уже собран».'
        },
        {
          id:2,
          articleTitle:'Сколько стоит доставка?',
        },
        {
          id:3,
          articleTitle:'Когда смогут доставить?',
        },
        {
          id:4,
          articleTitle:'Можно доставить к точному времени?',
        },
        {
          id:5,
          articleTitle:'Все вопросы...',
        },
      ]
    },
    {
      id:4,
      chapterTitle:'Оформление заказа',
    },
    {
      id:5,
      chapterTitle:'Вопросы по заказу',
    },
    {
      id:6,
      chapterTitle:'Защита покупателя',
    },
    {
      id:7,
      chapterTitle:'Для корпоративных клиентов',
    },
    {
      id:8,
      chapterTitle:'Больше полезного',
    },
  ])

  const popularQuestions = [
    {
      id:1,
      chapterId:3,
      articleId:2,
    },
    {
      id:2,
      chapterId:3,
      articleId:3,
    },
    {
      id:3,
      chapterId:1,
      articleId:3,
    },
    {
      id:4,
      chapterId:1,
      articleId:1,
    },
  ]

  const isMobile = isSSRMobile

  const [current, setCurrent] = useState<string | null>(null)
  const [currentChapterId, setCurrentChapterId] = useState<number>(1)

  const handleChapterSelect = (id:number) => {
    const current = helpArr.find(item => id === item.id)
    if(current){
      setCurrent(current.chapterTitle)
      setCurrentChapterId(id)
    }
  }

  return (
    <>
      <PageLayout
        isMobile={isMobile}
        title='Помощь'
        description='description'
        pageType={PageType.short}
      >
        <HelpBreadCrumbs
          current={current}
        />
        <HelpMain
          helpArr={helpArr}
          setCurrent={handleChapterSelect}
          activeChapter={currentChapterId}
          popularQuestions={popularQuestions}
        />
      </PageLayout>
    </>
  );
}
