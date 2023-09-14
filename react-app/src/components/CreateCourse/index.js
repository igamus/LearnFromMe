import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../../store/categories";
import CourseForm from "../CourseForm";

function CreateCourse() {
    const dispatch = useDispatch();
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

    useEffect(() => {
        dispatch(getCategoriesThunk()).then(() => setCategoriesLoaded(true));
    }, [dispatch]);

    const categoriesWithSets = {};
    const categories = useSelector(state => Object.values(state.categories).forEach(category => {
        categoriesWithSets[category.name] = {
            name: category.name,
            id: category.id,
            set: false
        }
    }));

    const starterForm = {
        name: "",
        description: "",
        courseImage: null,
        price: "",
        level: "Beginner",
        whatYoullLearn1: "",
        whatYoullLearn2: "",
        whatYoullLearn3: "",
        courseVideo: null,
        categories: categoriesWithSets
    };

    return (
        <CourseForm type="create" starterForm={starterForm} categoriesLoaded={categoriesLoaded} />
    );
};

export default CreateCourse;
