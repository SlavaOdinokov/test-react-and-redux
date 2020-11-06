const initialState = {
    menu: [],
    items: [],
    loading: true,
    error: false,
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            }

        case 'MENU_REQUESTED':
            return { ...state }

        case 'MENU_ERROR':
            return {
                ...state,
                error: true
            }

        case 'ITEM_ADD_TO_CART':
            const id = action.payload
            const itemIdx = state.items.findIndex(item => item.id === id)

            if (itemIdx >= 0) {
                const itemInState = state.items.find(item => item.id === id)
                const newItem ={
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }

                return {
                    ...state, 
                    items: [
                        ...state.items.slice(0, itemIdx),
                        newItem,
                        ...state.items.slice(itemIdx + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }

            const item = state.menu.find(item => item.id === id)
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            }

            return { 
                ...state, 
                items: [...state.items,newItem],
                totalPrice: state.totalPrice + newItem.price 
            }

        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload
            const itemIndex = state.items.findIndex(item => item.id === idx)
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty']
            return { 
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
             }

        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            }

        default:
            return state
    }
}

export default reducer
