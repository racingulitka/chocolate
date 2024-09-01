import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
import Footer from "@/components/Footer/Footer";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import HomePageHero from "@/components/HomePage/HomePageHero/HomePageHero";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSSRMobile: getIsSsrMobile(context),
    },
  };
}

const inter = Inter({ subsets: ["latin"] });

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
        <HomePageHero />
      </PageLayout>
    </>
  );
}
