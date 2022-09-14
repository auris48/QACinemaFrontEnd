import logo from "./logo.svg";
import DiscussionBoard from "./components/DiscussionBoard/DiscussionBoard";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import PostThread from "./components/DiscussionBoard/PostThread";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/DiscussionBoard" element={<DiscussionBoard />} />
        <Route path="/DiscussionBoard/Post/:id" element={<PostThread />} />
      </Routes>
    </div>
  );
}

export default App;
