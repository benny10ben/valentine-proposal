"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default function ValentinePage() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { width, height } = useWindowSize();
  
  // REFS
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Background Music
  const toggleMusic = () => {
    if (bgAudioRef.current) {
      if (isMusicPlaying) {
        bgAudioRef.current.pause();
      } else {
        bgAudioRef.current.volume = 0.5;
        bgAudioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
    
    // 1. Stop Background Music
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
      setIsMusicPlaying(false);
    }

    // 2. Play Celebration Music
    if (successAudioRef.current) {
      successAudioRef.current.volume = 1.0;
      successAudioRef.current.play().catch(e => console.log("Success audio failed", e));
    }
  };

  const phrases = [
    "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!",
    "Surely not?", "You might regret this!", "Give it another thought!",
    "Are you absolutely certain?", "This could be a mistake!", "Have a heart!",
    "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?",
    "Is that your final answer?", "You're breaking my heart ;(",
    "Plsss? :( You're breaking my heart",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen selection:bg-rose-600 selection:text-white bg-gradient-to-br from-pink-500 via-rose-500 to-pink-700 overflow-hidden px-4">
      
      {/* BACKGROUND MUSIC */}
      <audio ref={bgAudioRef} src="/yapapa.m4a" loop />

      {/* SUCCESS MUSIC */}
      <audio ref={successAudioRef} src="/happy.mp3" loop />

      {/* PLAY MUSIC BUTTON */}
      {!yesPressed && (
        <button
          onClick={toggleMusic}
          className="absolute top-5 left-5 z-50 bg-white/20 hover:bg-white/40 text-white font-semibold py-2 px-4 rounded-full backdrop-blur-sm transition-all shadow-lg flex items-center gap-2 text-sm md:text-base"
        >
          {isMusicPlaying ? "🔇 Pause" : "🎵 Play Music"}
        </button>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float1 { 0% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(50vw, 20vh) rotate(10deg); } 50% { transform: translate(80vw, 50vh) rotate(-5deg); } 75% { transform: translate(20vw, 80vh) rotate(5deg); } 100% { transform: translate(0, 0) rotate(0deg); } }
        @keyframes float2 { 0% { transform: translate(0, 0) rotate(0deg) scaleX(-1); } 25% { transform: translate(-50vw, 30vh) rotate(-10deg) scaleX(-1); } 50% { transform: translate(-80vw, 60vh) rotate(5deg) scaleX(-1); } 75% { transform: translate(-20vw, 90vh) rotate(-5deg) scaleX(-1); } 100% { transform: translate(0, 0) rotate(0deg) scaleX(-1); } }
        @keyframes float3 { 0% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(80vw, -50vh) rotate(10deg); } 66% { transform: translate(40vw, -80vh) rotate(-5deg); } 100% { transform: translate(0, 0) rotate(0deg); } }
        @keyframes float4 { 0% { transform: translate(0, 0) rotate(0deg) scaleX(-1); } 33% { transform: translate(-80vw, -40vh) rotate(-10deg) scaleX(-1); } 66% { transform: translate(-30vw, -90vh) rotate(5deg) scaleX(-1); } 100% { transform: translate(0, 0) rotate(0deg) scaleX(-1); } }
        @keyframes float5 { 0% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(-20vw, 40vh) rotate(-5deg); } 50% { transform: translate(20vw, 60vh) rotate(5deg); } 75% { transform: translate(-10vw, 80vh) rotate(-5deg); } 100% { transform: translate(0, 0) rotate(0deg); } }
        @keyframes float6 { 0% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(30vw, -20vh) rotate(5deg); } 50% { transform: translate(60vw, 20vh) rotate(-5deg); } 75% { transform: translate(90vw, -10vh) rotate(5deg); } 100% { transform: translate(0, 0) rotate(0deg); } }

        .floating-cat-1 { animation: float1 25s ease-in-out infinite; position: absolute; top: 10%; left: 10%; z-index: 0; }
        .floating-cat-2 { animation: float2 28s ease-in-out infinite; position: absolute; top: 15%; right: 10%; z-index: 0; }
        .floating-cat-3 { animation: float3 32s ease-in-out infinite; position: absolute; bottom: 10%; left: 5%; z-index: 0; }
        .floating-cat-4 { animation: float4 30s ease-in-out infinite; position: absolute; bottom: 15%; right: 5%; z-index: 0; }
        .floating-cat-5 { animation: float5 22s ease-in-out infinite; position: absolute; top: 5%; left: 50%; z-index: 0; }
        .floating-cat-6 { animation: float6 26s ease-in-out infinite; position: absolute; top: 40%; left: -10%; z-index: 0; }
      `}</style>

      {yesPressed && <Confetti width={width} height={height} />}

      {!yesPressed && (
        <>
          <div className="floating-cat-1 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZzcHRoYmM2Z2kxZ3QzN2ZpOW9jMGsxdW90dmhnOWZseTQzM3ViMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/901mxGLGQN2PyCQpoc/giphy.gif" alt="Floating 1" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
          </div>
          <div className="floating-cat-2 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N3UyNmFvNXRuZmU2ZnMxNm5oNjZvczUzYWRiejNlZXlrZzRuaWpzdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif" alt="Floating 2" className="w-24 h-24 md:w-40 md:h-40 object-contain" />
          </div>
          <div className="floating-cat-3 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGZudzU5NzBscHFsdmo2NjE0ZDJrMmZieWZ5b3lsMzZic2FwNHp0NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jfBMwXQrfTLhV81tIU/giphy.gif" alt="Floating 3" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
          </div>
          <div className="floating-cat-4 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Zjd4cDc0MTdrZ3U0dXdsNTAzeXQxejBwMTJ4eXR1Zms1ZThxYmh5ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5jCTUWzwtqG2s/giphy.gif" alt="Floating 4" className="w-24 h-24 md:w-36 md:h-36 object-contain" />
          </div>
          <div className="floating-cat-5 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzE4N3AyaDB2ZGN6YXR6Z3NuYmhmazN5NHpqNTJvcjdiY3d4eTMydSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Zl7u48zLVFgLpRwq6f/giphy.gif" alt="Floating 5" className="w-24 h-24 md:w-36 md:h-36 object-contain" />
          </div>
           <div className="floating-cat-6 pointer-events-none">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3A0ZnI4bnZ4dno1NXg1ZDlsZGp1bHh5ZDhhdjYyOXZmdHVoa3BvNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/In0Lpu4FVivjISX9HT/giphy.gif" alt="Floating 6" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
          </div>
        </>
      )}

      <div className="z-10 flex flex-col items-center w-full max-w-2xl">
        {yesPressed ? (
          <div className="flex flex-col items-center gap-6 animate-fade-in p-4 w-full">
            
            <div className="text-4xl md:text-6xl font-bold my-4 text-center text-white drop-shadow-md leading-tight">
              WOOOOOO!!! I love you pookie!! ;
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
              <img
                src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                alt="Bear Kissing"
                className="w-full max-w-[200px] h-[200px] rounded-lg shadow-xl object-cover"
              />
              <img
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm9kZzlidTdkODl6NGdtejR0cTMwc3Vudm4yNzlmMjFpYWN4M3l1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T70hpBP1L0N7U0jtkq/giphy.gif"
                alt="Bear Kissing 2"
                className="w-full max-w-[200px] h-[200px] rounded-lg shadow-xl object-cover"
              />
              <img
                src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aDdoNnN3OTZmYTdtazJobjE3ZmtwZDBvNXBwaHZucGZldDIwcDNrYiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3UkqVq3F50bVCi9URl/giphy.gif"
                alt="Cute Pair"
                className="w-full max-w-[200px] h-[200px] rounded-lg shadow-xl object-cover"
              />
            </div>
            
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 w-full">
              <img
                className="w-full max-w-[250px] h-auto md:h-[250px] rounded-lg shadow-2xl object-cover"
                src="/img1.png"
                alt="Valentine"
              />
              <img
                className="w-full max-w-[250px] h-auto md:h-[250px] rounded-lg shadow-2xl object-cover"
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWxndGw5aGl3bHNwNTNxbTI0cXBjbjZsM2hrNThldW9kb2dhaXkxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CK5gKBdBXdGtVv6AfG/giphy.gif"
                alt="Cute Cat Pair"
              />
            </div>
            
            <h1 className="text-3xl md:text-5xl mb-8 text-center text-white font-bold drop-shadow-md px-4">
              Will you be my Valentine? 
            </h1>

            <div className="flex flex-wrap flex-col md:flex-row gap-4 items-center justify-center w-full px-4">
              <button
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 min-w-[120px]`}
                // REMOVED THE Math.min CAP HERE to allow unlimited growth
                style={{ fontSize: noCount * 20 + 16 }} 
                onClick={handleYesClick}
              >
                Yes 🥹
              </button>
              
              <button
                onClick={() => setNoCount(noCount + 1)}
                className="bg-rose-400 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out min-w-[120px]"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}