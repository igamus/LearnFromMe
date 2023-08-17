import OpenModalButton from "../OpenModalButton";
import EncourageLoginModal from "../EncourageLogInModal";
import { addToCartThunk } from "../../store/cart";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CartButton.css";

function CartButton({ user, course, coursesInCart }) {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="cart-button-container">
            <p className="price"><s className="old-price">${(Math.floor(parseFloat(course.price)) * 9).toFixed(2)}</s> ${parseFloat(course.price).toFixed(2)}</p>
            {
                user === null
                    ?
                <OpenModalButton className="purple-button add-to-cart" buttonText="Add to Cart" modalComponent={<EncourageLoginModal />} />
                    :
                user?.id === course.instructor.id
                    ?
                <button className="purple-button add-to-cart" onClick={() => history.push(`/learn/${course.id}`)}>Manage course</button>
                    :
                coursesInCart.includes(course.id)
                    ?
                <button className="purple-button add-to-cart" onClick={() => history.push("/cart")}>Go to cart</button>
                    :
                <button className="purple-button add-to-cart" onClick={() => dispatch(addToCartThunk(course.id))}>Add to cart</button>
            }
        </div>
    );
};

export default CartButton;
