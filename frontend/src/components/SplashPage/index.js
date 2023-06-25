import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import DemoFormModal from "../DemoModal"
import "./SplashPage.css";
import OpenModalButtonSplashPage from "../OpenModalSplashPage";

const SplashPage = () => {


    return (
      <>
      <div className="SplashPage-Container">
        <div className="SplashPage-Images">
            <div className="pic" id="pic1" />
            <div className="pic" id="pic2" />
            <div className="pic" id="pic3" />
            <div className="pic" id="pic4" />
            <div className="pic" id="pic5" />
            <div className="pic" id="pic6" />
            <div className="pic" id="pic7" />
            <div className="pic" id="pic8" />
            <div className="pic" id="pic9" />
            <div className="pic" id="pic10" />
        </div>
        <div>
        <h1>Welcome to heirbnb</h1>
        </div>
    </div>
      </>
    );
  };

  export default SplashPage;
