import "../styles/mainLoadingFallback.css";
import { Alert, Spin } from "antd";


function MainLoadingFallback() {
    return (
        <div className="loading-fallback">
            <Spin tip="Loading..."  size="large"/>
        </div>
    );
}

export default MainLoadingFallback;
