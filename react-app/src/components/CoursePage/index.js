import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";
import { useHistory } from "react-router-dom";
import "./CoursePage.css";
import { readCartThunk } from "../../store/cart";
import CartButtonSingle from "../CartButtonSingle";

function CoursePage() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [courseLoaded, setCourseLoaded] = useState(false);

    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId)).then(() => setCourseLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(readCartThunk());
    }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);
    const coursesInCart = useSelector(state => Object.keys(state.cart).map(key => parseInt(key)));
    // console.log("cart:", cart)
    const user = useSelector(state => state.session.user);

    return courseLoaded && (
        <div className="course-page">

            <div className="sidebar">
                 {/* <img className="course-card-image" src={course.courseImage} alt="course-thumbnail" /> */}
                <img className="course-blurb-image" src="https://images.pexels.com/photos/2377182/pexels-photo-2377182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="course-thumbnail" />
                <div className="course-blurb">
                    <CartButtonSingle user={user} course={course} coursesInCart={coursesInCart} />
                </div>
            </div>

            <div className="blackground">
                <div className="course-page-content">
                    <div className="course-page-nav clickable" onClick={() => history.push("/browse")}>Courses</div>
                    <h1>{course.name}</h1>
                    <h2>{course.description}</h2>
                    <p>Created by <span className="course-page-nav">{course.instructor.name}</span></p>
                </div>
            </div>

            <div className="what-youll-learn-container">
                <h2 className="what-youll-learn-header">What you'll learn</h2>
                {course.whatYoullLearn.split("|").map((takeaway, idx) => (
                    <p key={idx} className="takeaway"><span className="checkmark">&#10004;</span> {takeaway}</p>
                ))}
            </div>
        </div>
    );
};

export default CoursePage;
