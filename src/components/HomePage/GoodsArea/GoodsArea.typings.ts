import {ProductCard} from '../../ProductCard/ProductCard.typings'

export interface GoodsArr{
    id:number,
    slug:string,
    title:string,
    isSeeAll:boolean,
    goodsCard:ProductCard[]
}