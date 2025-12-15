import React, { useEffect, useState } from 'react'

function AiTextToImg() {
    const [loading,setLoading] = useState(false);
    const [aiReady,setAiReady] = useState(false);
    const [text,setText] = useState("");
    const [displayText,setDisplayText] = useState("");
    const [error,setError] = useState("");
    const [currentImg,setCurrentImg] = useState(null);

    useEffect(()=>{
        const isAIReady = setInterval(()=>{
            if(
                window.puter &&
                window.puter.ai &&
                window.puter?.ai?.txt2img &&
                typeof window.puter.ai.txt2img === 'function'
            ){
                setAiReady(true);
                clearInterval(isAIReady);
            }
        },300);
        return ()=> clearInterval(isAIReady);
    },[]);

    const genImg = async()=>{
        if(!text.trim()){
            setError("Text area is empty!");
            return ;
        }
        if(text.length > 111){
            setError("Text must be less then 111 characters!!");
            return ;
        }
        setLoading(true);
        setError("");
        setCurrentImg(null);

        try{
            const img = await window.puter.ai.txt2img(text,{
                model:"gpt-image-1"
            });
            setDisplayText(text);
            setCurrentImg(img);
        } catch(error){
            console.error("Puter AI error:", error);
            setError(error.message   || "Something went wrong with text-to-img!(free service...)");
        } finally{
            setLoading(false);
            setText("");
        }
    }

    const stopGenImg = ()=>{
        setCurrentImg(null);
        setLoading(false);
    }

    return (
       <div className="rounded-2xl mt-3 min-h-screen bg-linear-to-br from-blue-500 to-green-500 flex flex-col items-center p-4 gap-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light bg-linear-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent text-center">
            AI Text to Image
        </h1>

        <div
            className={`px-4 py-2 rounded-full text-sm font-medium border
            ${
            aiReady
                ? "bg-green-500/20 text-green-300 border-green-500"
                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
            }`}
        >
            {aiReady ? "🟢 AI Ready" : "🟡 Waiting for AI..."}
        </div>

        <div className="w-full max-w-4xl bg-black/80 border-4 border-blue-400 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex items-center justify-center ">
            {loading && (
                <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full" />
            )}

            {!loading && currentImg && (
                <div>
                    <img
                        src={currentImg}
                        alt="Generated"
                        className="w-full max-w-sm rounded-xl object-contain"
                    />
                    <p className='text-center mt-3 capitalize text-blue-500 italic'>{displayText}</p>
                </div>
            )}
            </div>

            <div className="flex-1 flex flex-col gap-4">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!aiReady}
                maxLength={111}
                placeholder="Enter your image prompt... (max 111 chars only!!!)"
                className="w-full h-32 md:h-40 rounded-xl p-3 outline-none border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 focus:shadow-pink-700/70"
            />
            <div className='text-right'>
                <p className='text-sm text-gray-400'>{text.length} /111 characters</p>
            </div>
            {!loading ? (
                <button
                onClick={genImg}
                className="border-2 rounded-xl py-2 cursor-pointer hover:text-orange-500 transition bg-orange-500/20 text-orange-300 border-orange-500/30 disabled:opacity-50"
                disabled={!aiReady || loading || !text.trim()}
                >
                Generate Image
                </button>
            ) : (
                <button
                onClick={stopGenImg}
                className="border-2 rounded-xl py-2 bg-red-500/20 text-red-300 border-red-500/30 cursor-pointer"
                >
                Stop
                </button>
            )}

            {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            </div>
        </div>
        </div>
    );
}
export default AiTextToImg;

// export default AiTextToImg
// import React, { useEffect, useState } from "react";

// function AiTextToImg() {
//   const [loading, setLoading] = useState(false);
//   const [aiReady, setAiReady] = useState(false);
//   const [text, setText] = useState("");
//   const [displayText, setDisplayText] = useState("");
//   const [error, setError] = useState("");
//   const [currentImg, setCurrentImg] = useState(null);

//   // 🔹 Check if Puter AI is ready
//   useEffect(() => {
//     const checkAI = setInterval(() => {
//       if (
//         window.puter?.ai?.txt2img &&
//         typeof window.puter.ai.txt2img === "function"
//       ) {
//         setAiReady(true);
//         clearInterval(checkAI);
//       }
//     }, 300);

//     return () => clearInterval(checkAI);
//   }, []);

//   // 🔹 Generate image
//   const genImg = async () => {
//     if (!text.trim()) return;

//     if (text.length > 111) {
//       setError("Text must be less than 111 characters!");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setCurrentImg(null);

//     try {
//       const result = await window.puter.ai.txt2img(text, {
//         model: "gpt-image-1"
//       });

//       // 🔥 Convert Blob → usable image URL
//       const imageUrl =
//         result instanceof Blob ? URL.createObjectURL(result) : result;

//       setCurrentImg(imageUrl);
//       setDisplayText(text);
//     } catch (err) {
//       console.error("Puter AI Error:", err);
//       setError(err?.message || "Something went wrong with text-to-img!");
//     } finally {
//       setLoading(false);
//       setText("");
//     }
//   };

//   // 🔹 Stop generation
//   const stopGenImg = () => {
//     setLoading(false);
//     setCurrentImg(null);
//   };

//   return (
//     <div className="rounded-2xl mt-3 min-h-screen bg-linear-to-br from-blue-500 to-green-500 flex flex-col items-center p-4 gap-6">
//       <h1 className="text-4xl sm:text-6xl md:text-7xl font-light bg-linear-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent text-center">
//         AI Text to Image
//       </h1>

//       {/* AI Status */}
//       <div
//         className={`px-4 py-2 rounded-full text-sm font-medium border ${
//           aiReady
//             ? "bg-green-500/20 text-green-300 border-green-500"
//             : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
//         }`}
//       >
//         {aiReady ? "🟢 AI Ready" : "🟡 Waiting for AI..."}
//       </div>

//       <div className="w-full max-w-4xl bg-black/80 border-4 border-blue-400 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
//         {/* Image Area */}
//         <div className="flex-1 flex items-center justify-center">
//           {loading && (
//             <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full" />
//           )}

//           {!loading && currentImg && (
//             <div>
//               <img
//                 src={currentImg}
//                 alt="Generated"
//                 className="w-full max-w-sm rounded-xl object-contain"
//               />
//               <p className="text-center mt-3 capitalize text-blue-500 italic">
//                 {displayText}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <div className="flex-1 flex flex-col gap-4">
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             disabled={!aiReady}
//             maxLength={111}
//             placeholder="Enter your image prompt... (max 111 chars)"
//             className="w-full h-32 md:h-40 rounded-xl p-3 outline-none border-2 border-gray-700 focus:ring-2 focus:ring-pink-400 transition"
//           />

//           <p className="text-sm text-gray-400 text-right">
//             {text.length} / 111 characters
//           </p>

//           {!loading ? (
//             <button
//               onClick={genImg}
//               disabled={!aiReady || !text.trim()}
//               className="border-2 rounded-xl py-2 cursor-pointer hover:text-orange-500 transition bg-orange-500/20 text-orange-300 border-orange-500/30 disabled:opacity-50"
//             >
//               Generate Image
//             </button>
//           ) : (
//             <button
//               onClick={stopGenImg}
//               className="border-2 rounded-xl py-2 bg-red-500/20 text-red-300 border-red-500/30 cursor-pointer"
//             >
//               Stop
//             </button>
//           )}

//           {error && (
//             <p className="text-red-400 text-sm text-center">{error}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AiTextToImg;