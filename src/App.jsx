import Home from "./components/Home";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Home></Home>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
