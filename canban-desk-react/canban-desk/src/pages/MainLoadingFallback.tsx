import "../styles/mainLoadingFallback.css";
import { Alert, Spin } from "antd";

function MainLoadingFallback() {
  return (
    <div className="loading-fallback">
      <Spin description="Loading..." size="large" />
    </div>
  );
}

export default MainLoadingFallback;
