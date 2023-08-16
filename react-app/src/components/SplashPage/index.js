import "./SplashPage.css";

function SplashPage() {
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
                    <i class="fab fa-js-square" />
                    <i class="fab fa-react" />
                    <i class="fab fa-python" />
                    <img src="https://img.icons8.com/ios/100/flask.png" alt="flask"/>
                    {/* https://icons8.com/ */}
                </div>
            </div>

            <div className="more-splash">
                <h1 className="header">Welcome to LearnFromMe!</h1>
                <p>At LearnFromMe, we understand the importance of education and the unique opportunities that technology provides to connect everybody with masterful educators.</p>

            </div>
        </div>
    );
};

export default SplashPage;
