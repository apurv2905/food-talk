import React, {useState} from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
    const [showCartItem, setShowCartItem] = useState(false);

    const showCartHandler = () => {
        setShowCartItem(true);
    }

    const hideCartHandler = () => {
        setShowCartItem(false);
    }

    return (
        <CartProvider>
            {showCartItem && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
