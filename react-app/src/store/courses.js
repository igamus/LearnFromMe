// action types
const READ_SINGLE_COURSE = "learnfromme/courses/READ_SINGLE_COURSE";
const READ_CATEGORY_COURSES = "learnfromme/courses/READ_CATEGORY_COURSES";
const READ_ALL_COURSES = "learnfromme/courses/READ_ALL_COURSES";
const READ_ALL_COURSES_ORGANIZED = "learnfromme/courses/READ_ALL_COURSES_ORGANIZED";
const CREATE_COURSE = "learnfromme/courses/CREATE_COURSE"

// action creators
const readSingleCourseAction = course => ({
    type: READ_SINGLE_COURSE,
    course
});

const readCategoryCoursesAction = courses => ({
    type: READ_CATEGORY_COURSES,
    courses
});

const readAllCoursesAction = courses => ({
    type: READ_ALL_COURSES,
    courses
});

const readAllCoursesOrganizedAction = courses => ({
    type: READ_ALL_COURSES_ORGANIZED,
    courses
});

const createCourseAction = course => ({
    type: CREATE_COURSE,
    course
});

// thunk action creators
export const readSingleCourseThunk = courseId => async dispatch => {
    const res = await fetch(`/api/courses/course/${courseId}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(readSingleCourseAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readCategoryCoursesThunk = categoryId => async dispatch => {
    console.log(`/api/courses/${categoryId}`)
    const res = await fetch(`/api/courses/${categoryId}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(readCategoryCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readAllCoursesThunk = () => async dispatch => {
    const res = await fetch("/api/courses/");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readAllCoursesOrganizedThunk = () => async dispatch => {
    const res = await fetch("/api/courses/all");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllCoursesOrganizedAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createCourseThunk = formData => async dispatch => {
    console.log("yes, this changed again");
    console.log("Great")
    console.log("gonna send to create");
    const res = await fetch("/api/courses/", {
        method: "POST",
        body: formData
    });
    console.log("we did it?")

    if (res.ok) {
        const resCourse = await res.json();
        dispatch(createCourseAction(resCourse));
    } else {
        return console.log("There was an error creating the course.")
    }
};

// reducer
const initialState = { singleCourse: {}, categoryCourses: {}, allCourses: {} };

function courseReducer(state = initialState, action) {
    switch(action.type) {
        case READ_SINGLE_COURSE: {
            let newState = {
                ...state,
                singleCourse: { ...action.course }
            };
            return newState;
        }
        case READ_CATEGORY_COURSES: {
            let newState = {
                ...state,
                categoryCourses: {}
            };
            action.courses.forEach(
                course => newState.categoryCourses[course.id] = course
            );
            return newState;
        }
        case READ_ALL_COURSES: {
            let newState = {
                ...state,
                allCourses: {}
            }
            action.courses.forEach(
                course => newState.allCourses[course.id] = course
            );
            return newState;
        }
        case READ_ALL_COURSES_ORGANIZED: { // not sure about this whole process, might nuke this branch since it's so involved...
            let newState = {
                ...state,
                allCourses: {}
            };
            const categories = action.courses;
            for (const category in categories) {
                newState.allCourses[category] = [...categories[category]];
            }
            return newState;
        }
        case CREATE_COURSE: { // almost certainly dont need to handle this in the reducer, right?
            let newState = {
                ...state,
            }
            newState.singleCourse = { ...action.course };
            // newState.categoryCourses[action.course.category]
            // allCourses all -- not organized...
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default courseReducer;