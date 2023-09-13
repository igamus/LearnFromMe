import { useEffect, useState } from "react";
import CourseForm from "../CourseForm";

function CreateCourse() {
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const categories = {};
    useEffect(() => {
        fetch("/api/category/")
            .then((res) => res.json())
            .then((data) => data.forEach(category => {
                categories[category.name] = {
                    name: category.name,
                    id: category.id,
                    set: false
                }
            }))
            .then(() => setCategoriesLoaded(true))
    }, []);

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
        categories
    };

    return (
        <CourseForm type="create" starterForm={starterForm} categoriesLoaded={categoriesLoaded} />
    );
};

export default CreateCourse;
