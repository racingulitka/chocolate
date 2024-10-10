import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import {goodsArr} from '@/pages/index'
import PageLayout from '@/components/PageLayout/PageLayout'
import ProductCardModal from '@/components/ProductCardModal/ProductCardModal'
import { GetServerSidePropsContext } from 'next'
import { getIsSsrMobile } from '@/utils/isSsrMobile'
import { PageType } from '@/components/PageLayout/PageLayout.typings'
import productStyles from '@/components/ProductCardModal/ProductCardModalFullScreen.module.scss'
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
      props: {
        isSsrMobile: getIsSsrMobile(context),
      },
    };
  }


export default function ProductPage({
    isSsrMobile,
}:{
    isSsrMobile:boolean
}){

    
    const findItemSlug = () => {
        for(const category of goodsArr){
            const foundItem = category.goodsCard.find(item => item.slug === router.query.slug)
            if(foundItem) return foundItem
        }
        return null
    }
    const router = useRouter()

    const itemSlug = findItemSlug()
    const isMobile = isSsrMobile

    useEffect(()=> {
        document.body.style.overflow = 'unset';
    }, [isSsrMobile])

    if(!itemSlug) return 'товар не найден'

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
                <ProductCardModal className={productStyles} isMobile={isMobile} props={itemSlug} />
            </>
        </PageLayout>
    )
}