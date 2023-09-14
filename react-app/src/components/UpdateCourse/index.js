import { useEffect, useState } from "react";
import CourseForm from "../CourseForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";
import { getCategoriesThunk } from "../../store/categories";
import { useHistory } from "react-router-dom";

function UpdateCourse() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [courseLoaded, setCourseLoaded] = useState(false);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId)).then(() => setCourseLoaded(true));
        dispatch(getCategoriesThunk()).then(() => setCategoriesLoaded(true))
    }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);
    const user = useSelector(state => state.session.user);
    const whatYoullLearn = course?.whatYoullLearn?.split("|");

    console.log('loaded course:', course);
    const categoriesInCourse = course?.categories?.map(category => category.name)
    const categoriesWithSets = {};
    const categories = useSelector(state => Object.values(state.categories).forEach(category => {
        categoriesWithSets[category.name] = {
            name: category.name,
            id: category.id,
            set: categoriesInCourse ? categoriesInCourse.includes(category.name) : false
        }
    }));

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
        id: course.id,
        categories: categoriesWithSets
    };

    if (courseLoaded && course.instructor.id !== user.id) {
        history.push("/");
    }

    return courseLoaded && categoriesLoaded && (
         <CourseForm type="update" starterForm={starterForm} categoriesLoaded={categoriesLoaded} />
    );
};

export default UpdateCourse;
