import "./ViewAllCourses.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { browseCoursesThunk } from "../../store/courses";
import { readCartThunk } from "../../store/cart";
import CourseCard from "../CourseCard";
import CartButton from "../CartButton";
import { useParams } from "react-router-dom";

function ViewAllCourses() {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(browseCoursesThunk(categoryId)).then(() => setIsLoaded(true));
    }, [dispatch, categoryId]);

    const [cartLoaded, setCartLoaded] = useState(false);

    const user = useSelector(state => state.session.user);
    useEffect(() => {
        if (user?.id) dispatch(readCartThunk()).then(() => setCartLoaded(true));
    }, [dispatch]);

    const allCourses = useSelector(state => Object.values(state.courses.allCourses));
    const coursesInCart = useSelector(state => Object.values(state.cart).map(course => course.id));

    return (
        <div className="view-all-page">
            {
                !isNaN(parseInt(categoryId))
                    ?
                <h1 className="header all-courses-header">{allCourses[0]?.categories?.find(category => parseInt(categoryId) === category?.id)?.name}</h1>
                    :
                categoryId === "other"
                    ?
                <h1 className="header all-courses-header">Other Courses</h1>
                    :
                <h1 className="header all-courses-header">All Courses</h1>
            }
            {allCourses.map(course => (
                <>
                    <div className="course-card" key={course.id}>
                        <CourseCard course={course} type="browse" />
                        <CartButton user={user} course={course} coursesInCart={coursesInCart} />
                    </div>
                    <hr className="line" />
                </>
            ))}
        </div>
    );
};

export default ViewAllCourses;
