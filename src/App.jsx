import Home from "./components/Home";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-gray-200">
      <Home></Home>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
