import { useEffect, useState } from "react";
import CourseForm from "../CourseForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";
import { useHistory } from "react-router-dom";

function UpdateCourse() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [courseLoaded, setCourseLoaded] = useState(false);
    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId)).then(() => setCourseLoaded(true));
    }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);
    const user = useSelector(state => state.session.user);
    const whatYoullLearn = course?.whatYoullLearn?.split("|");

    const starterForm = {
        name: course.name,
        description: course.description,
        courseImage: course.courseImage,
        price: course.price,
        level: course.level,
        whatYoullLearn1: courseLoaded && whatYoullLearn[0],
        whatYoullLearn2: courseLoaded && whatYoullLearn[1],
        whatYoullLearn3: courseLoaded && whatYoullLearn[2],
        courseVideo: course.courseVideo,
        id: course.id
    };

    if (courseLoaded && course.instructor.id !== user.id) {
        history.push("/courses");
    }

    return courseLoaded && (
        <CourseForm type="update" starterForm={starterForm} />
    );
};

export default UpdateCourse;
