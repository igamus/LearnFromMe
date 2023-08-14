import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCartThunk } from "../../store/cart";

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
                <div>
                    <h2>{course.name}</h2>
                </div>
            ))}
        </div>
    );
};

export default Cart;
