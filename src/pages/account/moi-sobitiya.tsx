import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import React from 'react'
import MyEvents from "@/components/Header/components/AccountMenu/components/MyEvents/MyEvents";

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
        pageType={isMobile ? PageType.slug : PageType.short}
      >
        <MyEvents isMobile={isMobile}/>
      </PageLayout>
    </>
  );
}
