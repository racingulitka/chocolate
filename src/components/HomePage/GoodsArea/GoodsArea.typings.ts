import {ProductCard} from '../../ProductCard/ProductCard.typings'

export interface GoodsArr{
    id:number,
    title:string,
    isSeeAll:boolean,
    goodsCard:ProductCard[]
}