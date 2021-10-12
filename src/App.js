import { connect } from "react-redux";
import Routes from "@/routes";

import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

library.add(fab);
library.add(far);
library.add(fas);
dom.watch();

function App(props) {
  const { isLoading, children } = props;

  return (
    <>
      <div className={`loading ${isLoading ? "active" : ""}`}></div>
      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        hideProgressBar={true}
        closeButton={false}
        pauseOnHover={false}
        theme="colored"
      />
      <Routes />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
