import { useHistory } from "react-router-dom";
import "./SplashPage.css";

function SplashPage() {
    const history = useHistory();
    return (
        <div className="splash-page">
            <div className="image-box">
                <img className="splash-image" src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/81b1c8f5-6f56-49ec-b2de-5154b7b8cddb.jpg" alt="That funky art style that's in for modern people of a lady holding a pie chart--like, the actual pie circle." />

                <div className="float-box">
                    <h2 className="float-header header">Jump into learning for less</h2>
                    <p className="float-text">If you’re new to LearnFromMe, we’ve got good news: For a limited time, courses start at just $14.99 for new learners! Shop now.</p>
                </div>
            </div>

            <div className="tech-stack">
                <span>Made with:</span>
                <div className="technologies">
                    <i className="fab fa-html5" />
                    <i className="fab fa-css3-alt" />
                    <i className="fab fa-js-square" />
                    <i className="fab fa-react" />
                    <img width="50" height="50" src="https://img.icons8.com/ios/50/6a6f73/redux.png" alt="redux"/>
                    {/* https://icons8.com/ */}
                    <i className="fab fa-python" />
                    <img src="https://img.icons8.com/fluency/96/6a6f73/flask.png" alt="flask" />
                    {/* https://icons8.com/ */}
                </div>
            </div>

            <div className="more-splash">
                <h1 className="header">Welcome to LearnFromMe!</h1>
                <p>At LearnFromMe, we understand the importance of education and the unique opportunities that technology provides to connect everybody with masterful educators.</p>
                <p>LearnFromMe is an eCommerce education site where users can purchase or host courses. Log in to get started!</p>
            </div>

            <div className="image-box">
                <img className="splash-image" src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg" alt="A man explaining" />
                <div className="instruction-side">
                    <div className="header instruction-side-header">Become an instructor</div>
                    <p style={{lineHeight: "1.75"}}>Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.</p>
                    <button className="black-button home-instruct-button" onClick={() => history.push("/teach") }>Start teaching today</button>
                </div>
            </div>
        </div>
    );
};

export default SplashPage;
