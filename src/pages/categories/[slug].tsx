import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import {goodsArr} from '@/pages/index'
import PageLayout from '@/components/PageLayout/PageLayout'
import { GetServerSidePropsContext } from 'next'
import { getIsSsrMobile } from '@/utils/isSsrMobile'
import { PageType } from '@/components/PageLayout/PageLayout.typings'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'
import CategoryListing from '@/components/CategoryListing/CategoryListing'
import { GoodsArr } from '@/components/HomePage/GoodsArea/GoodsArea.typings'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
      props: {
        isSsrMobile: getIsSsrMobile(context),
      },
    };
  }


export default function CategoryPage({
    isSsrMobile,
}:{
    isSsrMobile:boolean
}){

    
    const findItemSlug = () => {
        for(const category of goodsArr){
            if(category.slug === router.query.slug) return category
        }
        return null
    }
    const router = useRouter()

    const itemSlug = findItemSlug()
    const isMobile = isSsrMobile

    useEffect(()=> {
        document.body.style.overflow = 'unset';
    }, [isSsrMobile])

    if(!itemSlug) return 'Страница не найдена'

    return(
        <PageLayout
            isMobile={isSsrMobile}
            title={itemSlug.title}
            description='dkjfldjfl'
            pageType={PageType.slug}
        >
            <>
            {
                !isMobile &&
                <BreadCrumbs currentPage={itemSlug.title}/>
            }
                <CategoryListing props={itemSlug} isMobile={isMobile}/>
            </>
        </PageLayout>
    )
}