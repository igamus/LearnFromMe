import { useHistory } from 'react-router-dom';
import wlogo from './wlogo.png';
import "./Footer.css";

function Footer() {
    const history = useHistory();
    return (
        <div className="footer">
            <div className="footer-section-1">
                <div className="footer-s1s1">
                    <div style={{fontWeight: "bold", fontSize: "1.2rem"}}>Teach the world online</div>
                    <p style={{height: "16px", margin: "0"}}></p>
                    <div>Create an online video course, reach students across the globe, and earn money</div>
                </div>
                <button className="footer-button" onClick={() => history.push("/teach")}>Teach on LearnFromMe</button>
            </div>
            <hr className="footer-line" />
            <div className="footer-section-2">
                <h2>Top technologies used in <span style={{color: "#cec0fc"}}>LearnFromMe</span> to build in-demand career skills.</h2>
                <div className="footer-technologies">
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
            <hr className="footer-line" />
            <div className="footer-section-3">
                <img
                    className="footer-logo clickable"
                    src={wlogo}
                    alt="The words 'learn from me' in PascalCase' with three purple computers connecting in a network in the 'o' of 'from'"
                    onClick={() => history.push("/")}
                />
                <div className='copyright'>
                    Check out the <a style={{color: "#cec0fc", textDecoration: "none"}} className='clickable' href="https://github.com/igamus/learnfromme/">code</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
