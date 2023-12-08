https://www.youtube.com/watch?v=g88HHFjuMm4&t=18903s

trick:

    -ใช้ type เมื่อคุณต้องการสร้าง Type ที่เป็น Union, Intersection, Tuple

        type User = {
            firstname: string,
            lastname: string
        };

        type NumberOrStringOrStudent = string | number | User;

    -ใช้ interface เมื่อคุณต้องการให้ Type นั้นสามารถถูก "extended

        type Person = {
            firstname: string,
            lastname: string
        };

        interface User extends Person {
            role: string;
        };


0. install project 

    npx create-next-app@latest

    √ What is your project named? e-commerce-nextjs-tutorial
    √ Would you like to use TypeScript? Yes
    √ Would you like to use ESLint? Yes
    √ Would you like to use Tailwind CSS? Yes     
    √ Would you like to use `src/` directory? No
    √ Would you like to use App Router? (recommended) Yes
    ? Would you like to customize the default import alias? No
    √ What import alias would you like configured? ... @/* 

	cd e-commerce-nextjs-tutorial

    npm run dev

    npm install react-icons --save
    npm i moment

1. fix globals.css

    -src > app > globals.css

        @tailwind base;
        @tailwind components;
        @tailwind utilities;

2. create header footer component and import at src > app > layout.tsx

3. เพิ่มรูปใน public, เพิ่ม product details ใน src > utils > products.tsx

4. เมื่อต้องการใช้ image firebase ต้อง config

    -next.config.js

        /** @type {import('next').NextConfig} */
        const nextConfig = {
            images: {
                domains: ["firebasestorage.googleapis.com"]
            }
        }

        module.exports = nextConfig

5. install Material utilities

    npm install @mui/material @emotion/react @emotion/styled

6. ทำการสร้าง route โดยการสร้าง folder ใน app และสร้าง ไฟล์ page.tsx

    -src > app > cart > page.tsx

7. การสร้าง route และ รับค่า id จาก url ทำการสร้าง folder ใน app และสร้าง folder ชื่อ [productId] จากนั้นสร้าง file page.tsx

    example url : http://localhost:3000/product/1231

    -src > app > product > [productId] > page.tsx
    // ตัวอย่างการรับค่าจาก id จาก url

        import Container from "@/components/Container";
        import ProductDetails from "./ProductDetails";
        import { product } from "@/utils/product";

        interface Iparams{
            productId?: string;
        }

        const Product = ({params}: {params:Iparams}) => {
        console.log("params is ", {params});
            
            return (<div className="p-8">
                <Container>
                    <ProductDetails product={product}/>
                </Container>
            </div>)
        }
        
        export default Product;

    -src > components > products > ProductCard.tsx
    // ตัวอย่างการส่งค่า id ผ่าน url

        'use client'
        import { formatPrice } from "@/utils/formatPrice";
        import { truncateText } from "@/utils/truncateText";
        import Image from "next/image"
        import { Rating } from "@mui/material";
        import { useRouter } from "next/navigation";

        interface ProductCardProps{
            data: any
        }

        const ProductCard:React.FC<ProductCardProps> = ({data}) => {
            console.log(data.reviews.length);
            
            const router = useRouter();

            const productRating = data.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / data.reviews.length;

            return (

            <div onClick={() => router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-ssm p-2 transition hover:scale-105 text-center text-sm">
                <div className="flex flex-col items-center w-full gap-1">
                    <div className="aspect-square overflow-hidden relative w-full">
                        <Image fill src={data.images[0].image} alt={data.name} className="w-full h-full object-contain"/>
                    </div>
                    <div className="mt-4">{truncateText(data.name)}</div>
                    <div><Rating value={productRating} readOnly /></div>
                    <div>{data.reviews.length} reviews</div>
                    <div className="font-semibold">{formatPrice(data.price)}</div>
                </div>
            </div>);
        }
        
        export default ProductCard;

8. วิธีการสร้าง หน้า ProductDetails
    
    มีข้อมูลสินค้า

    const product = {
        id: "64a4ebe300900d44bb50628a",
        name: "Logitech MX Keys Advanced Wireless Illuminated Keyboard, Tactile Responsive Typing, Backlighting, Bluetooth, USB-C, Apple macOS, Microsoft Windows, Linux, iOS, Android, Metal Build (Black)",
        description:
        "PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap\nCOMFORT AND STABILITY - Type with confidence on a keyboard crafted for comfort, stability, and precision",
        price: 102.99,
        brand: "logitech",
        category: "Accesories",
        inStock: true,
        images: [
        {
            color: "Black",
            colorCode: "#000000",
            image:
            "https://firebasestorage.googleapis.com/v0/b/ecommerce-shop-cc542.appspot.com/o/products%2F1688529886610-black-logitech-keyboard.jpg?alt=media&token=353aa276-1316-4e50-bc26-8e3828fe6cdd",
        },
        ],
        reviews: [
        {
            id: "64a65a6158b470c6e06959ee",
            userId: "6475af156bad4917456e6e1e",
            productId: "64a4ebe300900d44bb50628a",
            rating: 5,
            comment: "good",
            createdDate: "2023-07-06T06:08:33.067Z",
            user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",
            emailVerified: null,
            image:
                "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
            hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
            },
        },
        ],
    }

    ต้องการแสดงข้อมูล ชื่อ, rating, รายละเอียด, การเลือกสี, การเพิ่มจำนวน, การ Add to cart, แสดงรูปภาพ

    หน้า ProductDetails ทำการรับค่า product กำหนด prop เป็น any

    1. กำหนด useState cartProduct

        const [cartProduct, setCartProduct] = useState<CartProductType>({
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            brand: product.brand,
            selectedImg: {...product.images[0]},
            quantity: 1,
            price: product.price,
        })

    2. สร้าง function ต่างๅเมื่อมี event
        // ตัวอย่างหากต้องการนำค่าจาก child component มา update ค่า useState ที่ parent component

        -ตัวอย่าง function ต้องการนำชื่อรูปจาก child component มาเปลี่ยนค่า useState เมื่อทำการเลือกสี

            -ProductDetails (parent component)

                const handleColorSelect = useCallback(
                    (value: SelectedImgType) => {
                        setCartProduct((prev) => {                
                            return {...prev, selectedImg: value}}
                        )
                }, [cartProduct.selectedImg])

                return (<div>
                        <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect}/>
                    </div>)

            -SetColor (child component) จะเห็นได้ว่า เมื่อมีการเลือกสีจะส่งค่า image onClick={()=>handleColorSelect(image)}

                const SetColor:React.FC<SetcolorProps> = ({images, cartProduct, handleColorSelect,}) => {
                return (<div>
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold">COLOR:</span>
                        <div className="flex gap-1">{
                            images.map((image) => {
                                return (
                                <div 
                                key={image.color}
                                onClick={()=>handleColorSelect(image)}
                                className={`
                                h-7
                                w-7
                                rounded-vull
                                border-teal-300
                                flex
                                items-center
                                justify-center
                                ${
                                    cartProduct.selectedImg.color ===
                                    image.color
                                        ? "border-[1.5px]"
                                        : "border-none"
                                }`}>
                                <div style={{background: image.colorCode}} className="h-5 w-5 rounded-full bordre-[1.2px] border-slate-300 cursor-pointer">

                                </div>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>)
            }

    3. ส่งค่า product (ข้อมูลสินค้าทั้งหมดว่ามีกี่สี มีกี่รูป) และค่า cartProduct (ค่า useState เกี่ยวกับสินค้าค่าจะเปลี่ยนไปได้เมื่อมีการเลือกสีเพิ่มจำนวน) ไปยัง child component ต่างๆ

9. สร้าง hooks
    
    -trick การส่ง props แบบ spread
        - parent component

            const value = /* ค่าที่กำหนด */;
            const props = { prop1: 'value1', prop2: 'value2' };
            <CartContext.Provider value={value} {...props} />

        -children component

            const MyComponent = (props) => {
                const { value, prop1, prop2 } = props;
                return <div></div>
            }

    -root dir > hooks > useCart.tsx สร้างเพื่อสำหรับนำข้อมูล cart ใน useContext มาใช้
        
        // สร้าง CartContextProvider สำหรับ return CartContext.Provider เมื่อเรียกใช้ CartContextProvider และ เก็บค่า state และ function ของ cart
        export const CartContextProvider = (props: Props) => {
            const [cartTotalQty, setCartTotalQty] = useState(0)
            const [cartProducts, setCartProducts] = useState<CartProductType[]|null>(null)

            const handleAddProductToCart = useCallback((product: CartProductType)=>{
                setCartProducts((prev)=>{
                    let updatedCart;
                    if(prev){
                        updatedCart = [...prev, product]
                    }else{
                        updatedCart = [product]
                    }
                    return updatedCart
                })
            }, [])

            const value = {cartTotalQty, cartProducts, handleAddProductToCart}

            return <CartContext.Provider value={value} {...props}/>;
        }

        // useCart ใช้สำหรับนำค่า CartContext มาใช้
        export const useCart = () => {
            const context = useContext(CartContext)
            if(context === null){
                throw new Error('useCart must be used within a CartContextProvider')
            }

            return context
        }

    -root dir > providers > CartProvider.tsx ใช้สำหรับครอบ children ทั้งหมด ที่ src > app > layout.tsx

        // สร้างเพื่อจะได้ใช้งาน CartContext.Provider ง่ายๆ
        const CartProvider: React.FC<CartProviderProps> = ({children}) => {
            return <CartContextProvider>{children}</CartContextProvider>
        }

    -src > app > layout.tsx
        
        // ใช้งาน CartProvider
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar/>
            <main className='flex-grow'>{children}</main>
            <Footer/>
          </div>
        </CartProvider>

    -src > product > [productId] > productDetails.tsx

        // วิธีใช้ดึงค่า handleAddProductToCart กับ cartProducts จาก useContext ออกมา
        const {handleAddProductToCart, cartProducts} = useCart()

10. การใช้ useEffect ดึงค่าจาก localStorage มาไว้ใน context cartProduct
    การ set ค่าใน localStorage จาก function ใน context

    -hooks > useCart.tsx
        export const CartContextProvider = (props: Props) => {
            const [cartTotalQty, setCartTotalQty] = useState(0)
            const [cartProducts, setCartProducts] = useState<CartProductType[]|null>(null)
            
            useEffect(()=>{
                const cartItems: any = localStorage.getItem('eshopCartItems')
                const cProducts: CartProductType[] | null = JSON.parse(cartItems)
                
                setCartProducts(cProducts)
            }, [])

            const handleAddProductToCart = useCallback((product: CartProductType)=>{
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

            const value = {cartTotalQty, cartProducts, handleAddProductToCart}

            return <CartContext.Provider value={value} {...props}/>;
        }

11. กา่รใช้ toast ในการแจ้งเตือน
    
    -npm install react-hot-toast

    -src > app > layout.tsx
    
        <Toaster toastOptions={{style: {
          background: "rgb(51 65 85)",
          color: "#fff",
        }}}/>
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar/>
            <main className='flex-grow'>{children}</main>
            <Footer/>
          </div>
        </CartProvider>

    -hooks > useCart

        import { toast } from 'react-hot-toast';

        toast.success('Product added to cart');