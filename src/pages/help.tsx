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
        }
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
        />
      </PageLayout>
    </>
  );
}
