import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { readAllTaughtCoursesThunk } from "../../store/courses";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import "./ManageCourses.css";
import CourseCard from "../CourseCard";

function ManageCourses() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [coursesLoaded, setCoursesLoaded] = useState(false);

    useEffect(() => {
        dispatch(readAllTaughtCoursesThunk()).then(() => setCoursesLoaded(true));
    }, [dispatch]);

    const courses = useSelector(state => Object.values(state.courses.taughtCourses));

    return coursesLoaded && (
        <div className="manage-courses-page">
            <button className="purple-button add-to-cart create-course-button" onClick={() => history.push("/courses/new")}>Create a Course</button>
            {courses.map(course => (
                <div key={course.id} className="course-field">
                    <CourseCard course={course} type="manage" />
                    <div className="management-buttons">
                        <button className="white-button add-to-cart" onClick={() => history.push(`/courses/course/${course.id}/update`)}>Update Course</button>
                        <OpenModalButton className="red-button add-to-cart" buttonText="Delete Course" modalComponent={<DeleteModal type="course" id={course.id} />} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageCourses;

/* <div key={course.id}>
    <h2 className="clickable" onClick={() => history.push(`/learn/${course.id}`)}>{course.name}</h2>
    <button onClick={() => history.push(`/courses/course/${course.id}/update`)}>Update Course</button>
    <OpenModalButton buttonText="Delete Course" modalComponent={<DeleteModal type="course" id={course.id} />} />
</div> */
