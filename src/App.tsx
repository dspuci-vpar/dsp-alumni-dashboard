import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { Analytics } from '@vercel/analytics/react'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Analytics />
    </Router>
  );
};

export default App;
