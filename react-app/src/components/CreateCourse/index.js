import CourseForm from "../CourseForm";

function CreateCourse() {
    const starterForm = {
        name: "",
        description: "",
        courseImage: null,
        price: "",
        level: "Beginner",
        whatYoullLearn1: "",
        whatYoullLearn2: "",
        whatYoullLearn3: "",
        courseVideo: null
    };

    return (
        <CourseForm type="create" starterForm={starterForm} />
    );
};

export default CreateCourse;
