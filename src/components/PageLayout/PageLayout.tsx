import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Inter } from "next/font/google";
import Footer from '../Footer/Footer';
import Header from '../Header/Header'
import { PageType } from './PageLayout.typings';

const inter = Inter({ subsets: ["latin"] });

export default function PageLayout({
    children,
    isMobile,
    title,
    description,
    pageType,
}: {
    children: React.ReactNode,
    isMobile: boolean,
    title: string,
    description: string,
    pageType: PageType,
}) {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                {
                    !(isMobile && pageType === PageType.slug) &&
                    <Header
                        isMobile={isMobile}
                        pageType={pageType}
                    />
                }
                {children}
                <Footer isMobile={isMobile} />
            </main>
        </>
    )
}