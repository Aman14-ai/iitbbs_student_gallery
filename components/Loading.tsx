import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const JokeLoadingPage = () => {
  const [stage, setStage] = useState(0);
  const [dots, setDots] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots(prev => {
        if (prev.length === 3) return "";
        return prev + ".";
      });
    }, 500);

    const stageTimer = setInterval(() => {
      setStage(prev => {
        if (prev >= 4) return 4;
        return prev + 1;
      });
    }, 2500);

    return () => {
      clearInterval(dotsTimer);
      clearInterval(stageTimer);
    };
  }, []);

  const messages = [
    "Initializing photo database...",
    "Waking up the hamster that powers our server...",
    "Asking the photos to smile nicely...",
    "Convincing pixels to align properly...",
    "Almost there... just convincing the last photo to load..."
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden relative p-4">
      {/* Floating elements */}
      <motion.div 
        className="absolute top-10 left-10 text-6xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        📸
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-5xl"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🤔
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-1/4 text-4xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        😴
      </motion.div>

      {/* Main content */}
      <div className="text-center relative z-10 bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <motion.h1 
          className="text-2xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {stage < 4 ? "Photo Gallery Loading" : "Wait, is this taking too long?"}
        </motion.h1>

        <div className="h-20 mb-6">
          <AnimatePresence mode="wait">
            <motion.p 
              key={stage}
              className="text-lg text-gray-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {messages[stage]}
            </motion.p>
          </AnimatePresence>
          
          <div className="flex justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-purple-500 rounded-full mx-1"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar with funny messages */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: stage < 4 ? `${(stage + 1) * 20}%` : "95%" }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {stage < 2 && "Finding camera..."}
            {stage === 2 && "Removing red eyes..."}
            {stage === 3 && "Adding filters..."}
            {stage >= 4 && "Stuck at 95% (as always)..."}
          </div>
        </div>

        {/* Joke section that appears after delay */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <p className="font-medium text-gray-800">Why was the photo so shy?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-full text-sm"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Hide Answer" : "Reveal Answer"}
            </motion.button>
            
            <AnimatePresence>
              {showAnswer && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-gray-700 font-bold"
                >
                  Because you are a chutiya . Nothing is going to happen. Database Dropped! 😂
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Final message */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-sm text-gray-500"
          >
            <p>Just kidding! Your photos will load any moment now...</p>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-2xl mt-2"
            >
              ⏳
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-4 left-4 text-sm text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading{dots}
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 right-4 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        v1.0.0 • Not actually loading anything
      </motion.div>
    </div>
  );
};

export default JokeLoadingPage;