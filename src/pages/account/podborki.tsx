import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import React from 'react'
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import Collections from "@/components/Header/components/AccountMenu/components/Collections/Collections";

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
        pageType={PageType.short}
      >
        <>
        <BreadCrumbs currentPage={'Подборки'} marginTop={129}/>
        <Collections isMobile={isMobile} />
        </>
      </PageLayout>
    </>
  );
}
