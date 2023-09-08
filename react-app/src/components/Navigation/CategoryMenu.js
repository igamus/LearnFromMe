import { useHistory } from "react-router-dom";
import "./CategoryMenu.css";
import "./ProfileButton.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function CategoryMenu() { // categories ?
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const ulRef = useRef();
    const [categories, setCategories] = useState([]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        fetch("/api/category/")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setIsLoaded(true)
            });
    }, [dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
        if(ulRef.current === null) return;
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "category-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return isLoaded && (
        <div className="container">
            <div className="navlink clickable" onMouseEnter={openMenu}>Courses</div>

            <div className={ulClassName} ref={ulRef} onMouseLeave={closeMenu}>
                <div className="invisible" />
                <div className="actual-category-dropdown">
                    {categories.map(category => (
                        <>
                            <p key={"cat" + category.id} className="dropdown clickable" onClick={() => {
                                history.push(`/category/${category.id}`);
                                closeMenu();
                            }}>{category.name}</p>
                            <hr key={"line" + category.id} className="line" />
                        </>
                    ))}
                    <p className="dropdown clickable" onClick={() => {
                        history.push("/category/other");
                        closeMenu();
                    }}>Other</p>
                </div>
            </div>
        </div>
    );

};

export default CategoryMenu;
