import { Routes,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import AiToSpeech from "./Components/AiToSpeech";
import AiTextToImg from "./Components/AiTextToImg";

function App() {
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/aitexttospeech" element={<AiToSpeech />}/>
        <Route path="/aitexttoimg" element={<AiTextToImg />}/>
      </Routes> 
      <Footer />
    </div>
  )
}

export default App
