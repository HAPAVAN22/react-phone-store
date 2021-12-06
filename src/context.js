import React, { useState, useEffect } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
// Provider - provide all the info
// Consumer

const ProductProvider = (props) => {
    // objects as reference
    // const [productState,setProductState] = useState({
    //     products: storeProducts,
    //     detailProduct: detailProduct,
    //     cart: [],
    //     modalOpen: true,
    //     modalProduct: detailProduct,

    // });

    const [products,setProds] = useState([]);
    const [detailProd,setDetailProd] = useState(detailProduct);
    const [cart,setCart] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [modalProduct,setModalProduct] = useState(detailProduct);
    const [cartSubTotal,setCartSubTotal] = useState(0);
    const [cartTax,setCartTax] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(() => {
        setProducts();
    },[])

    useEffect(() => {
        addTotals();
    },[cart])

    const setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach((item) => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        setProds(tempProducts);
    }

    const getItem = (id) => {
        const product = products.find(item => item.id === id);
        return product;
    }

    const handleDetail = (id) => {
        const product = getItem(id);
        setDetailProd(product);
    }

    const addToCart = (id) => {
        let tempProducts = [...products];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        setProds(tempProducts);
        setCart([...cart,product]);
    }

    const openModal = (id) => {
        const product = getItem(id);
        setModalProduct(product,() => {
            setModalOpen(true);
        });
        
    }

    const closeModal = (id) => {
        setModalOpen(false);
    }

    const increment = (id) => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find((item) => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        setCart([...tempCart]);
    }

    const decrement = (id) => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find((item) => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            removeItem(id);
        }
        else{
            product.total = product.count * product.price;
            setCart([...tempCart]);
        }
    }

    const removeItem = (id) => {
        let tempProducts = [...products];
        let tempCart = [...cart];
        tempCart = tempCart.filter((item) => item.id !== id);

        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        setCart([...tempCart]);
        setProds([...tempProducts]);
    }

    const clearCart = (id) => {
        setCart([]);
        setProducts();
    }

    const addTotals = () => {
        let subTotal = 0;
        cart.map((item) => {
            subTotal += item.total;
        })
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        setCartSubTotal(subTotal);
        setCartTax(tax);
        setCartTotal(total);
    }

    return (
        <ProductContext.Provider value={{
            products,
            detailProd,
            cart,
            modalOpen : modalOpen,
            modalProduct,
            cartSubTotal,
            cartTax,
            cartTotal,
            handleDetail,
            addToCart,
            openModal,
            closeModal,
            increment,
            decrement,
            removeItem,
            clearCart,
            addTotals
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
