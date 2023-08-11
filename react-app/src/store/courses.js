// action types
const READ_SINGLE_COURSE = "learnfromme/courses/READ_SINGLE_COURSE";
const READ_CATEGORY_COURSES = "learnfromme/courses/READ_CATEGORY_COURSES";
const READ_ALL_COURSES = "learnfromme/courses/READ_ALL_COURSES";

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
    const res = await fetch("/api/courses/all");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
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
            console.log("in thunk:", action)
            let newState = {
                ...state,
                categoryCourses: {}
            };
            action.courses.forEach(
                course => newState.categoryCourses[course.id] = course
            );
            return newState;
        }
        case READ_ALL_COURSES: { // not sure about this whole process, might nuke this branch since it's so involved...
            let newState = {
                ...state,
                allCourses: {}
            };
            console.log('action:', action)
            // action.courses.forEach(
            //     category => newState.allCourses[category] =  {...category }
            // );
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default courseReducer;
