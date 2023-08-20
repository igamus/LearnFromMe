import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readCartThunk, removeFromCartThunk, clearCartThunk } from "../../store/cart";
import CourseCard from "../CourseCard";
import "./Cart.css";

function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [cartIsLoaded, setCartIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(readCartThunk()).then(() => setCartIsLoaded(true));
    }, [dispatch]);
    const cart = useSelector(state => Object.values(state.cart));

    return cartIsLoaded && (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? <h4 className="course-count" style={{marginBottom: "10px"}}>0 Courses in Cart</h4> : null}
            {
                cart.length
                    ?
                <div className="cart-page-container">
                    <div className="cart-container">
                        <h4 className="course-count">{cart.length} {cart.length === 1 ? "Course" : "Courses"} in Cart</h4>
                        <hr className="cart-line" />
                        {cart.map(course => (
                            <div key={course.id}>
                                <div className="course-in-cart">
                                    <CourseCard course={course} type="browse" />
                                    <div className="manage-course-in-cart">
                                        <div className="cart-purple" onClick={() => dispatch(removeFromCartThunk(course.id))}>Remove</div>
                                        <div className="cart-price" title="Sale price!">${course.price} <i className="fas fa-tag"></i></div>
                                    </div>
                                </div>
                                <hr className="cart-line-course" />
                            </div>
                        ))}
                    </div>
                    <div className="cart-sidebar">
                        <h3 style={{color: "#6a6f73"}}>Subtotal:</h3>
                        <div style={{margin: "0", marginBottom: "10px", fontWeight: "bold", fontSize: "2rem"}}>${cart.reduce((a,c) => a + c.price, 0)}</div>
                        <button className="purple-button" onClick={(e) => {
                            e.preventDefault();
                            dispatch(clearCartThunk());
                            alert('Courses "purchased" (feature to be added soon). Thank you for using LearnFromMe!')
                        }}>Checkout</button>
                        <p className="clickable" onClick={() => dispatch(clearCartThunk())}>Clear cart</p>
                    </div>
                </div>
                    :
                <div className="empty-cart">
                    <img className="empty-cart-image" src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg" alt="A person inspecting floating media through a magnifying glass" />
                    <div>Your cart is empty. Keep shopping to find a course!</div>
                    <button className="purple-button" onClick={() => history.push("/browse")}>Keep shopping</button>
                </div>
            }

        </div>
    );
};

export default Cart;
