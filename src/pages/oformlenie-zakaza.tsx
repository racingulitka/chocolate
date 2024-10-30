import PageLayout from "@/components/PageLayout/PageLayout";
import { getIsSsrMobile } from "@/utils/isSsrMobile";
import { GetServerSidePropsContext } from "next";
import { PageType } from "@/components/PageLayout/PageLayout.typings";
import React, { useState } from 'react'
import Order from "@/components/Order/Order";
import CompleteOrder from "@/components/CompleteOrder/CompleteOrder";

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

    const handleChangeScreen = (id: number) => {
        setActiveScreen(screens.find(item => item.id === id)?.screen)
    }

    const screens = [
        {
            id: 1,
            screen: <Order changeScreen={handleChangeScreen} />
        },
        {
            id: 2,
            screen: <CompleteOrder />
        },

    ]

    const [activeScreen, setActiveScreen] = useState<React.ReactNode>(screens[0].screen)

    return (
        <>
            <PageLayout
                isMobile={isMobile}
                title='Главная'
                description='description'
                pageType={PageType.short}
            >
                <>
                    {activeScreen}
                </>
            </PageLayout>
        </>
    );
}
