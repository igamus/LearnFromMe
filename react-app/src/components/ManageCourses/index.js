import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { readAllTaughtCoursesThunk } from "../../store/courses";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";

function ManageCourses() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [coursesLoaded, setCoursesLoaded] = useState(false);

    useEffect(() => {
        dispatch(readAllTaughtCoursesThunk()).then(() => setCoursesLoaded(true));
    }, [dispatch]);

    const courses = useSelector(state => Object.values(state.courses.taughtCourses));

    return coursesLoaded && (
        <div>
            <button onClick={() => history.push("/courses/new")}>Create a Course</button>
            {courses.map(course => (
                <div key={course.id}>
                    <h2 className="clickable" onClick={() => history.push(`/learn/${course.id}`)}>{course.name}</h2>
                    <button onClick={() => history.push(`/courses/course/${course.id}/update`)}>Update Course</button>
                    <OpenModalButton buttonText="Delete Course" modalComponent={<DeleteModal type="course" id={course.id} />} />
                </div>
            ))}
        </div>
    );
};

export default ManageCourses;
