import CourseForm from "../CourseForm";

function CreateCourse() {
    const starterForm = {
        name: "",
        description: "",
        courseImage: "",
        price: "",
        level: "",
        whatYoullLearn: "",
        courseVideo: ""
    };

    return (
        <CourseForm type="create" starterForm={starterForm} />
    );
};

export default CreateCourse;
