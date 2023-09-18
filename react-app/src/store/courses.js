// action types
const READ_SINGLE_COURSE = "learnfromme/courses/READ_SINGLE_COURSE";
const READ_ALL_PURCHASED_COURSES = "learnfromme/courses/READ_ALL_PURCHASED_COURSES";
const READ_ALL_TAUGHT_COURSES = "learnfromme/courses/READ_ALL_TAUGHT_COURSES";
const READ_COURSES = "learnfromme/courses/READ_COURSES";
const READ_ALL_COURSES_ORGANIZED = "learnfromme/courses/READ_ALL_COURSES_ORGANIZED";
const CREATE_COURSE = "learnfromme/courses/CREATE_COURSE";
const UPDATE_COURSE = "learnfromme/courses/UPDATE_COURSE";
const DELETE_COURSE = "learnfromme/courses/DELETE_COURSE";
const RESET_ON_LOGOUT = "learnfromme/courses/RESET_ON_LOGOUT";

// action creators
const readSingleCourseAction = course => ({
    type: READ_SINGLE_COURSE,
    course
});

const readAllPurchasedCoursesAction = courses => ({
    type: READ_ALL_PURCHASED_COURSES,
    courses
});

const readAllTaughtCoursesAction = courses => ({
    type: READ_ALL_TAUGHT_COURSES,
    courses
});

const readCoursesAction = courses => ({
    type: READ_COURSES,
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

const updateCourseAction = updatedCourse => ({
    type: UPDATE_COURSE,
    updatedCourse
});

const deleteCourseAction = courseId => ({
    type: DELETE_COURSE,
    courseId
});

const resetOnLogoutAction = () => ({
    type: RESET_ON_LOGOUT
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

export const readAllPurchasedCoursesThunk = () => async dispatch => {
    const res = await fetch("/api/courses/learn");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllPurchasedCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readAllTaughtCoursesThunk = () => async dispatch => {
    const res = await fetch("/api/courses/teach");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllTaughtCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const browseCoursesThunk = categoryId => async dispatch => {
    let res;
    if (!isNaN(parseInt(categoryId))) {
        res = await fetch(`/api/category/${parseInt(categoryId)}`)
    } else if (categoryId === "other") {
        res = await fetch("/api/category/other")
    } else {
        res = await fetch("/api/courses/");
    }

    if (res.ok) {
        const data = await res.json();
        return dispatch(readCoursesAction(data));
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
    const res = await fetch("/api/courses/", {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        const resCourse = await res.json();
        dispatch(createCourseAction(resCourse));
        return resCourse;
    } else {
        const errors = await res.json();
        throw errors;
    }
};

export const updateCourseThunk = (update, id) => async dispatch => {
    const res = await fetch(`/api/courses/course/${id}`, {
        method: "PUT",
        body: update
    });

    if (res.ok) {
        const resUpdate = await res.json();
        return dispatch(updateCourseAction(resUpdate));
    } else {
        const errors = await res.json();
        throw errors;
    }
};

export const deleteCourseThunk = courseId => async dispatch => {
    const res = await fetch(`/api/courses/course/${courseId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return dispatch(deleteCourseAction(courseId));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const resetOnLogoutThunk = () => async dispatch => {
    return dispatch(resetOnLogoutAction())
};

// reducer
const initialState = { singleCourse: {}, purchasedCourses: {}, taughtCourses: {}, allCourses: {} };
// need to add categories when creating a course => finish need to do it upon create as well

function courseReducer(state = initialState, action) { // need to streamline; there's no way you should update every slice every time
    switch(action.type) {
        case READ_SINGLE_COURSE: {
            const newState = {
                ...state,
                singleCourse: { ...action.course }
            };
            return newState;
        }
        case READ_ALL_PURCHASED_COURSES: {
            const newState = { ...state };
            action.courses.forEach(
                course => newState.purchasedCourses[course.id] = course
            )
            return newState;
        }
        case READ_ALL_TAUGHT_COURSES: {
            const newState = { ...state };
            action.courses.forEach(
                course => newState.taughtCourses[course.id] = course
            )
            return newState;
        }
        case READ_COURSES: {
            const newState = {
                ...state,
                allCourses: {}
            }
            action.courses.forEach(
                course => newState.allCourses[course.id] = course
            );
            return newState;
        }
        case READ_ALL_COURSES_ORGANIZED: { // not sure about this whole process, might nuke this subbranch of the state since it's so involved...
            const newState = {
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
            const newState = {
                ...state,
                taughtCourses: { ...state.taughtCourses }
            }
            newState.singleCourse = { ...action.course };
            newState.taughtCourses[action.course.id] = action.course;
            // did you implement the categories?
            // implement in course categories? newState.categoryCourses[action.course.category]
            // this is at least true because you're never hanging around on the page -- should clean up your stores...
            // implement in allCourses? allCourses all -- the not organized one...
            return newState;
        }
        case UPDATE_COURSE: {
            const newState = {
                ...state,
                singleCourse: { ...state.singleCourse },
                categoryCourses: { ...state.categoryCourses },
                allCourses: { ...state.allCourses }
            };

            newState.singleCourse = { ...action.updatedCourse };
            newState.categoryCourses[action.updatedCourse.id] = { ...action.updatedCourse };
            newState.allCourses[action.updatedCourse.id] = { ...action.updatedCourse };
            // implement categories?
            // this is at least true because you're never hanging around on the page -- should clean up your stores...
            return newState;
        }
        case DELETE_COURSE: {
            const newState = { ...state,
                singleCourse: {},
                categoryCourses: { ...state.categoryCourses },
                allCourses: { ...state.allCourses }
            };
            delete newState.purchasedCourses[action.courseId];
            delete newState.taughtCourses[action.courseId];
            delete newState.categoryCourses[action.courseId];
            delete newState.allCourses[action.courseId];
            return newState;
        }
        case RESET_ON_LOGOUT: {
            const newState = { ...state,
                purchasedCourses: {},
                taughtCourses: {}
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default courseReducer;
