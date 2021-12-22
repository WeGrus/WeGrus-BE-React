
import {BrowserRouter,Routes,Route} from "react-router-dom";
  import Welcome from "./routes/Welcome";
  import Login from "./routes/Login";
  import Signup from "./routes/Signup";
  import Study from "./routes/Study";
  import Page from "./routes/Page";
  import About from "./routes/About";
  import Group from "./routes/Group";
  import CreatePage from "./routes/Page_Create.js";
  import UpdatePage from "./routes/Page_Update.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}>
          <Route path="/about" element={<About />} />

          <Route path="/group" element={<Group />} />

          <Route path="/study" element={<Study />} />
          <Route path="/study/:pagenum" element={<Page />} />
          <Route path="/study/write/:userid" element={<CreatePage />} />
          <Route path="/study/update/:pagenum/:userid" element={<UpdatePage />} />

          <Route path="/board" element={<Study />} />
          <Route path="/board/write/:userid" element={<CreatePage />} />
          <Route path="/board/:pagenum" element={<Page />} />
          <Route path="/board/update/:pagenum/:userid" element={<UpdatePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
