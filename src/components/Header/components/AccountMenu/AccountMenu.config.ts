import CurrencyIcon from "./assets/currencyIcon"
import ProfileIcon from "./assets/profileIcon"
import HeartIcon from "./assets/heartIcon"
import OrdersIcon from "./assets/ordersIcon"
import EventsIcon from "./assets/eventsIcon"
import ReferalIcon from "./assets/referalIcon"
import HelpIcon from "./assets/helpIcon"
import LanguageIcon from "./assets/languageIcon"
import LoginIcon from "./assets/loginIcon"


export const authnorizedArr = [
    {
        id:1,
        icon:ProfileIcon,
        title:'Профиль',
    },
    {
        id:2,
        icon:HeartIcon,
        title:'Подборки',
    },
    {
        id:3,
        icon:OrdersIcon,
        title:'Заказы',
    },
    {
        id:4,
        icon:EventsIcon,
        title:'Мои события',
    },
    {
        id:5,
        icon:ReferalIcon,
        title:'За каждого друга + 3000 ₸',
    },
]

export const unauthnorizedArr = [
    {
        id:6,
        icon:HelpIcon,
        title:'Помощь',
    },
    {
        id:7,
        icon:CurrencyIcon,
        title:'Российский рубль',
    },
    {
        id:8,
        icon:LanguageIcon,
        title:'Русский',
    },
    {
        id:9,
        icon:LoginIcon,
        title:'Войти/Зарегестрироваться',
    },
]