import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Image URLs for each category
const imageData = {
  Fruits: [
    'https://images.pexels.com/photos/39803/pexels-photo-39803.jpeg?cs=srgb&dl=food-healthy-apple-39803.jpg&fm=jpg',
    'https://static.fanpage.it/wp-content/uploads/sites/22/2018/06/istock-162487071.jpg',
    'https://th.bing.com/th/id/OIP.hHS7HSAJt2B2ZZ-UDS7WNwHaFQ?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.T_d6sxcB1gBHADClVzb-hwHaE8?rs=1&pid=ImgDetMain',
    'https://images.alphacoders.com/767/76773.jpg',
    'https://www.gardeningknowhow.com/wp-content/uploads/2021/05/whole-and-slices-watermelon.jpg',
    'https://images6.alphacoders.com/472/472482.jpg',
    'https://th.bing.com/th/id/OIP.LJJ0uDYS5ZhDr2zJA-Q9sAHaFe?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.XY4K8NJldEZCGWahXjENHwHaFE?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.RGRsQR6Kk9v8KPdK6u_fkgHaE8?rs=1&pid=ImgDetMain'
  ],
  Animals: [
    'https://wallup.net/wp-content/uploads/2016/01/186050-lion-animals.jpg',
    'https://images8.alphacoders.com/104/1041414.jpg',
    'https://www.pixelstalk.net/wp-content/uploads/2016/08/Awesome-Elephant-Photos.jpg',
    'https://www.treehugger.com/thmb/2X6NfUf_lZhgx40sXg5Lul6KAH0=/3662x2441/filters:fill(auto,1)/GettyImages-171103284-899dc2501c9242bf94c48a0015e8e29a.jpg',
    'https://th.bing.com/th/id/R.42d54e4ca00a836d6cae2f446c049fd5?rik=rigjSLuvUcyk%2fw&riu=http%3a%2f%2fimages.wisegeek.com%2fzebras.jpg&ehk=e73N4oGTWRLbrGqll%2fFbnFJIQ4740mqVuihv6H%2b4xQ8%3d&risl=&pid=ImgRaw&r=0',
    'https://facts.net/wp-content/uploads/2020/01/syed-ahmad-yXTr6XeJDV8-unsplash.jpg',
    'https://cdn.mos.cms.futurecdn.net/ETb2xLjvc62eb7PPLspSsU.jpg',
    'https://th.bing.com/th/id/OIP.Pixq9eppCBGpifpmTPXgFwAAAA?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.Wt69k-cEOZkoxEvesik1zQHaEo?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/R.011fa8f0d0bf40cea1d5e5bdf2ce0034?rik=ROdy%2f0zpbLgEvA&riu=http%3a%2f%2fseancrane.com%2fblog%2fwp-content%2fuploads%2f2012%2f08%2fhippo_morning_light_1.jpg&ehk=SWY%2bER9e9mpG2ukFzXs%2ftyZnXl5%2b%2bGwKf%2bKtOvaE8UY%3d&risl=&pid=ImgRaw&r=0'
  ],
  Places: [
    'https://th.bing.com/th/id/OIP.h78iYdYfKHfr8d_PScz-QAHaEj?rs=1&pid=ImgDetMain',
    'https://images.hdqwalls.com/wallpapers/mountain-scenery-morning-sun-rays-4k-kf.jpg',
    'https://images6.alphacoders.com/310/thumb-1920-310407.jpg',
    'https://facts.net/wp-content/uploads/2021/06/Sahara-Desert.jpg',
    'https://th.bing.com/th/id/OIP.Mz156osVINO6sJ2_F1u26AHaEC?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.auyw4Fzp7SO-N-ngOgNNQQAAAA?rs=1&pid=ImgDetMain',
    'https://preview.redd.it/bjbundwu6zg11.jpg?auto=webp&s=642dbdbdb18bbc23c3569c6552c30f3a51ee9f6e',
    'https://th.bing.com/th/id/OIP.JGqbjPdaUSWVBUl6DJM_AAHaEK?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.jQ1N5DplUbrekiQ4bzRIQgHaE7?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.WmSDyqsFUoVNiqQjpQd8FgHaEo?rs=1&pid=ImgDetMain'
  ]
};

function App() {
  const [currentImage, setCurrentImage] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const getRandomImage = useCallback(() => {
    const categories = Object.keys(imageData);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const images = imageData[randomCategory];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    setCurrentImage(randomImage);
    setCurrentCategory(randomCategory);
    setSelectedImage(null);
    
    if (!gameStarted) {
      const randomViewCategory = categories[Math.floor(Math.random() * categories.length)];
      setViewingCategory(randomViewCategory);
    }
  }, [gameStarted]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
    setStartTime(new Date());
    getRandomImage();
  };

  const handleCategoryView = (category) => {
    setViewingCategory(category);
  };

  const handleImageSelect = (imgUrl) => {
    if (!gameStarted || gameOver) return;
    
    setSelectedImage(imgUrl);
    
    if (imgUrl === currentImage) {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('highScore', newScore.toString());
      }
      
      getRandomImage();
    } else {
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      
      setScoreHistory(prev => {
        const newHistory = [{ score, timeTaken, timestamp: endTime }, ...prev];
        return newHistory.slice(0, 10);
      });
      setGameOver(true);
    }
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    const savedHistory = localStorage.getItem('scoreHistory');
    if (savedHistory) {
      setScoreHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (scoreHistory.length > 0) {
      localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
    }
  }, [scoreHistory]);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      
      setScoreHistory(prev => {
        const newHistory = [{ score, timeTaken, timestamp: endTime }, ...prev];
        return newHistory.slice(0, 10);
      });
      setGameOver(true);
    }

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft, score, startTime]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500 opacity-10"
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main layout with sidebar */}
      <div className="relative z-10 flex min-h-screen">
        {/* History sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full w-72 bg-gray-800/90 backdrop-blur-md border-r border-indigo-600/30 shadow-2xl z-20 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-indigo-300">Game History</h2>
                  <button 
                    onClick={() => setShowHistory(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                {scoreHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No game history yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scoreHistory.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-xl font-bold text-yellow-300">{item.score}</div>
                          <div className="text-sm text-gray-400">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-sm">
                          <span className="text-indigo-300">
                            Time: {item.timeTaken}s
                          </span>
                          <span className="text-gray-400">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className={`flex-1 transition-all duration-300 ${showHistory ? 'ml-72' : 'ml-0'}`}>
          <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Image Match Challenge
              </motion.h1>
              
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2 bg-indigo-800/50 backdrop-blur-md rounded-lg border border-indigo-600/30 flex items-center hover:bg-indigo-700/50 transition-colors"
                >
                  <span className="mr-2">📜</span>
                  History
                </motion.button>
                
                <div className="flex items-center space-x-2 bg-indigo-800/50 backdrop-blur-md px-4 py-2 rounded-lg border border-indigo-600/30">
                  <span>⏱️</span>
                  <span className={`font-mono font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 bg-indigo-800/50 backdrop-blur-md px-4 py-2 rounded-lg border border-indigo-600/30">
                  <span>🏆</span>
                  <span className="font-mono font-bold text-yellow-300">{highScore}</span>
                </div>
              </div>
            </header>

            {/* Game content */}
            <main className="flex-1 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!gameStarted ? (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="text-center w-full max-w-2xl bg-gray-800/50 backdrop-blur-md p-12 rounded-2xl border border-indigo-600/30 shadow-xl"
                  >
                    <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
                      Welcome to Image Match!
                    </h2>
                    <p className="mb-8 text-xl text-gray-300 leading-relaxed">
                      Test your memory and speed! Match the displayed image with the correct category.
                      <br />
                      You have <span className="text-yellow-300">60 seconds</span> to get as many matches as possible!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="px-8 py-4 text-xl bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold shadow-lg hover:shadow-indigo-500/50 transition-all"
                    >
                      Start Game
                    </motion.button>
                  </motion.div>
                ) : gameOver ? (
                  <motion.div
                    key="gameover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="text-center w-full max-w-2xl bg-gray-800/50 backdrop-blur-md p-12 rounded-2xl border border-indigo-600/30 shadow-xl"
                  >
                    <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      {score > highScore ? 'New High Score!' : 'Game Over!'}
                    </h2>
                    <div className="space-y-6 mb-8">
                      <div className="text-3xl bg-gray-700/50 p-4 rounded-xl border border-indigo-600/30">
                        Your score: <span className="font-bold text-yellow-300">{score}</span>
                      </div>
                      <div className="text-2xl">
                        High score: <span className="font-bold text-green-300">{highScore}</span>
                      </div>
                      {scoreHistory[0] && (
                        <div className="text-lg text-gray-400">
                          Time taken: <span className="text-indigo-300">{scoreHistory[0].timeTaken}s</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="px-8 py-4 text-xl bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold shadow-lg hover:shadow-indigo-500/50 transition-all"
                      >
                        Play Again
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="game"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-4xl space-y-8"
                  >
                    {/* Current score */}
                    <motion.div 
                      className="text-center bg-gray-800/50 backdrop-blur-md py-4 rounded-xl border border-indigo-600/30 shadow-md"
                      animate={{ 
                        scale: [1, 1.02, 1],
                        backgroundColor: ['rgba(30, 30, 30, 0.5)', 'rgba(67, 56, 202, 0.5)', 'rgba(30, 30, 30, 0.5)']
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <p className="text-2xl font-bold">
                        Score: <span className="text-yellow-300">{score}</span>
                      </p>
                    </motion.div>
                    
                    {/* Current image */}
                    <motion.div
                      className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-indigo-600/30 flex items-center justify-center min-h-[300px] shadow-lg overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImage}
                          src={currentImage}
                          alt="Current"
                          className="max-h-[280px] max-w-full object-contain rounded-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, type: 'spring' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/500x300?text=Image+Not+Found";
                          }}
                        />
                      </AnimatePresence>
                    </motion.div>
                    
                    {/* Categories */}
                    <motion.div 
                      className="grid grid-cols-3 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {Object.keys(imageData).map(category => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.03, boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)" }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleCategoryView(category)}
                          className={`py-4 rounded-xl text-lg font-bold border shadow-md transition-all ${
                            viewingCategory === category
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                              : 'bg-gray-800/50 border-indigo-600/30 hover:bg-gray-700/50'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </motion.div>
                    
                    {/* Category images */}
                    {viewingCategory && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <h3 className="text-lg font-semibold text-indigo-300">
                          Select the matching image:
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {imageData[viewingCategory].map(imgUrl => (
                            <motion.div
                              key={imgUrl}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleImageSelect(imgUrl)}
                              className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImage === imgUrl
                                  ? imgUrl === currentImage
                                    ? 'border-green-400 shadow-lg shadow-green-500/30'
                                    : 'border-red-400 shadow-lg shadow-red-500/30'
                                  : 'border-gray-700 hover:border-indigo-400'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={viewingCategory}
                                className="w-full h-24 object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/150x100?text=Image+Not+Found";
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;