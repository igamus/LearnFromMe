import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCartThunk, removeFromCartThunk, clearCartThunk } from "../../store/cart";

function Cart() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readCartThunk());
    }, [dispatch]);
    const cart = useSelector(state => Object.values(state.cart));

    return (
        <div>
            <h1>Your Cart!</h1>
            {cart.map(course => (
                <div key={course.id}>
                    <h2>{course.name}</h2>
                    <button onClick={() => dispatch(removeFromCartThunk(course.id))}>Remove from cart</button>
                </div>
            ))}
            <p className="clickable" onClick={() => dispatch(clearCartThunk())}>Clear cart</p>
        </div>
    );
};

export default Cart;
