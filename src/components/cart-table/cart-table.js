import React from 'react'
import { connect } from 'react-redux'
import { deleteFromCart, cleaningCart } from '../../actions'
import WithRestoService from '../hoc'

import './cart-table.scss'

const CartTable = ({items, deleteFromCart, RestoService, cleaningCart}) => {
    if( items.length === 0){
        return (
            <div className="cart__title"> Ваша корзина пуста :(</div>
        )
    }

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, qtty} = item
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$ * {qtty}</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
            </div>
            <button  
            onClick = {() => { 
                RestoService.setOrder(generateOrder(items))
                    .then(res => {
                        if (!res.ok){
                            throw new Error('json error') 
                        } else {
                            alert('Заказ принят!')
                            cleaningCart()
                        }
                    }) 
            }} 
            className = "order">Оформить заказ</button>
        </>
    )
}

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    cleaningCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable))