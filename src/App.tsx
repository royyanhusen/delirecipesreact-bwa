import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse";
import SearchDetails from "./pages/SearchDetails";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="search" element={<SearchDetails />} />
      </Routes>
    </Router>
  )
}

export default App;