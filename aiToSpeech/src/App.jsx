import { Routes,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import AiToSpeech from "./Components/AiToSpeech";

function App() {
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/aitospeech" element={<AiToSpeech />}/>
      </Routes> 
      <Footer />
    </div>
  )
}

export default App
