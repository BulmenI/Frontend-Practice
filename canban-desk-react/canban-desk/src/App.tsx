import "./styles/global.css";
import AppRoutes from "./routes/AppRoutes";
import { useTasks } from "./hooks/customHooks";


function App() {
  useTasks();
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

export default App;
