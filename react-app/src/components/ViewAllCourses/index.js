import "./ViewAllCourses.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllCoursesThunk } from "../../store/courses";
import { readCartThunk } from "../../store/cart";
import CourseCard from "../CourseCard";
import CartButton from "../CartButton";

function ViewAllCourses() {
    const dispatch = useDispatch();

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
        <div className="view-all-page">
            <h1 className="header all-courses-header">All Courses</h1>
            {allCourses.map(course => (
                <>
                    <div className="course-card" key={course.id}>
                        <CourseCard course={course} />
                        <CartButton user={user} course={course} coursesInCart={coursesInCart} />
                    </div>
                    <hr className="line" />
                </>
            ))}
        </div>
    );
};

export default ViewAllCourses;
