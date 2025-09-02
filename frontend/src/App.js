import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextEditor from "./Document";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToNewDocument />} />
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

function RedirectToNewDocument() {
  window.location.href = `/documents/${uuidV4()}`;
  return null;
}

export default App;
