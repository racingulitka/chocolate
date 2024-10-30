import deliveryIcon from './assets/deliveryIcon.svg'
import completeIcon from './assets/completeIcon.svg'
import photoIcon from './assets/photoIcon.svg'
import storeIcon from './assets/storeIcon.svg'
import DeliveryIcon from './assets/DeliveryIcon'
import CompleteIcon from './assets/CompleteIcon'
import PhotoIcon from './assets/PhotoIcon'
import StoreIcon from './assets/StoreIcon'

export const orderStages = [
    {
        id:2,
        icon:StoreIcon,
        title:'Магазин',
    },
    {
        id:3,
        icon:PhotoIcon,
        title:'Фото',
    },
    {
        id:4,
        icon:DeliveryIcon,
        title:'Доставка',
    },
    {
        id:5,
        icon:CompleteIcon,
        title:'Готово',
    },
]