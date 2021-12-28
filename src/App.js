import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Study from "./components/screens/Study";
import Page from "./components/screens/Page";
import About from "./components/screens/About";
import Group from "./components/screens/Group";
import CreatePage from "./components/screens/Page_Create.js";
import UpdatePage from "./components/screens/Page_Update.js";
import Announce from "./components/screens/Announce";
import Profile from "./components/screens/Profile";
import { GlobalStyles } from "./styles";
import Operator from "./components/screens/Operator";

function App() {
  const isLoggedIn = false;
  const isOperator = true;
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<About />}>
          {isLoggedIn ? (
            <>
              <Route path="/announce" element={<Announce />} />
              <Route path="/group" element={<Group />} />
              <Route path="/study" element={<Study />} />
              <Route path="/study/:pagenum" element={<Page />} />
              <Route path="/study/write/:userid" element={<CreatePage />} />
              <Route
                path="/study/update/:pagenum/:userid"
                element={<UpdatePage />}
              />

              <Route path="/board" element={<Study />} />
              <Route path="/board/write/:userid" element={<CreatePage />} />
              <Route path="/board/:pagenum" element={<Page />} />
              <Route
                path="/board/update/:pagenum/:userid"
                element={<UpdatePage />}
              />
              <Route path="/profile/:userid" element={<Profile />} />
              {isOperator ? (
                <>
                  <Route path="/operator" element={<Operator />} />
                </>
              ) : null}
            </>
          ) : null}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
