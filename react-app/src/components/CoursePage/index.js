import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";

function CoursePage() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId));
    }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);

    return (
        <h1>{course.name}</h1>
    )
};

export default CoursePage;
