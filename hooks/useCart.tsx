import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import {createContext, useCallback, useContext, useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void

}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[]|null>(null)
    
    useEffect(()=>{
        const cartItems: any = localStorage.getItem('eshopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        
        setCartProducts(cProducts)
    }, [])


    const handleAddProductToCart = useCallback((product: CartProductType)=>{
        toast.success('Product added to cart');
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            }else{
                updatedCart = [product]
            }
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProductType)=>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            toast.success('Product removed');
            setCartProducts(filteredProducts)
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
        }
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart
    }

    return <CartContext.Provider value={value} {...props}/>;
}
 
export const useCart = () => {
    const context = useContext(CartContext)
    if(context === null){
        throw new Error('useCart must be used within a CartContextProvider')
    }

    return context
}