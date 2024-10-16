import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import React from 'react'
import MailingManage from "@/components/Header/components/AccountMenu/components/MailingManage/MailingManage";

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
        <MailingManage/>
      </PageLayout>
    </>
  );
}
