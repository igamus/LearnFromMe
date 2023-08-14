import "./ViewAllCourses.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllCoursesThunk } from "../../store/courses";
import { addToCartThunk, readCartThunk } from "../../store/cart";
import { useHistory } from "react-router-dom";

function ViewAllCourses() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(readAllCoursesThunk());
    }, [dispatch]);

    const [cartLoaded, setCartLoaded] = useState(false);

    const user = useSelector(state => state.session.user);
    useEffect(() => {
        if (user?.id) dispatch(readCartThunk()).then(() => setCartLoaded(true));
    }, [dispatch]);

    const allCourses = useSelector(state => Object.values(state.courses.allCourses));
    const coursesInCart = useSelector(state => Object.values(state.cart).map(course => course.id));

    return (
        <div>
            {allCourses.map(course => (
                <div key={course.id}>
                    <div className="clickable" onClick={() => history.push(`/courses/course/${course.id}`)}>
                        <h2>{course.name} by {course.instructor.name}</h2>
                        <h3>{course.category}</h3>
                        <h4>Course Id: {course.id}</h4>
                        <p>{course.description}</p>
                    </div>
                    {
                        cartLoaded && coursesInCart.includes(course.id)
                            ?
                        <button onClick={() => history.push("/cart")}>Go to cart</button>
                            :
                        <button onClick={() => dispatch(addToCartThunk(course.id))}>Add to cart</button>
                    }
                </div>
            ))}
        </div>
    );
};

export default ViewAllCourses;
