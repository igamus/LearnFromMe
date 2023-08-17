import "./CartButtonSingle.css";

import OpenModalButton from "../OpenModalButton";
import EncourageLoginModal from "../EncourageLogInModal";
import { addToCartThunk } from "../../store/cart";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CartButtonSingle.css";

function CartButton({ user, course, coursesInCart }) {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="cart-button-container-single">
            <h2 className="price"><s className="old-price">${(Math.floor(parseFloat(course.price)) * 9).toFixed(2)}</s> ${parseFloat(course.price).toFixed(2)}</h2>
            {
                user === null
                    ?
                <OpenModalButton className="white-button page-cart" buttonText="Buy now" modalComponent={<EncourageLoginModal />} />
                    :
                user?.id === course.instructor.id
                    ?
                <button className="white-button page-cart" onClick={() => history.push(`/learn/${course.id}`)}>Manage course</button>
                    :
                coursesInCart.includes(course.id)
                    ?
                <button className="white-button page-cart" onClick={() => history.push("/cart")}>Go to cart</button>
                    :
                <>
                    <button className="purple-button page-cart" onClick={() => dispatch(addToCartThunk(course.id))}>Add to cart</button>
                    <p style={{height: "10px", margin: "0"}}></p>
                    <button className="white-button page-cart" onClick={() => {
                        dispatch(addToCartThunk(course.id));
                        history.push("/cart");
                    }}>Buy now</button>
                </>
            }
        </div>
    );
};

export default CartButton;
