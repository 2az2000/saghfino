import { useRoutes } from "react-router-dom";
import routes from "./router/routes";
import "./App.css";
// import "./reset.css";


function App() {
  const router = useRoutes(routes);
  return(
    <>
      {router}
    </>
  )
}

export default App;
