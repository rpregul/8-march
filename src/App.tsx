import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Sparkles, Coffee, Map, Crown, Smartphone, PhoneCall, Bot, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Что для тебя важнее? 🥺",
    options: ["Чтобы разбирался в мемах 💖", "Чтобы не просил откусить 🍕"],
    // Замените URL ниже на свою картинку
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    question: "Твой идеальный вайб на день? 🍷",
    options: ["Пледик, сериальчик и вкусняшки 🍕", "Остаться на продленку👶"],
    // Замените URL ниже на свою картинку
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMlfUDdQPE4rA_XQUAX0RQW4O3qiukDvJTHQ&s"
  },
  {
    id: 3,
    question: "Что будем есть на свидании? 🥐",
    options: ["Огромную пиццу, чтобы сыр тянулся до потолка 🍕", "Конверты от деда мороза 🍝"],
    // Замените URL ниже на свою картинку
    image: "https://thumbs.dreamstime.com/b/%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B9-%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9-%D0%BA%D0%BE%D1%82-%D0%B4%D0%B5%D0%B4-%D0%BC%D0%BE%D1%80%D0%BE%D0%B7-%D0%B8-%D0%B5%D0%BB%D0%BA%D0%B0-%D0%B2%D0%B5%D1%81%D0%B5%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B0%D1%8F-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-199930269.jpg"
  },
  {
    id: 4,
    question: "Что будем смотреть вместе? 🥐",
    options: ["Спокойной ночи, малыши 🐷", "ПорнХаб 🍓"],
    // Замените URL ниже на свою картинку
    image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/08/cover_spoknok.jpg"
  },
  {
    id: 5,
    question: "Отлично, теперь подберем тебе партнера на основе твоих ответов 🦁",
    options: ["Хорошо 🤗", "Послать нахуй автора этой затеи 🎁"],
    // Замените URL ниже на свою картинку
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7E_SO10zxRgtafPgTcPDeaGS10a9XHlXQzw&s"
  }
];

const CANDIDATES = [
  {
    id: 1,
    name: "Кандидат №1",
    description: "Мужчина, 69 лет, в разводе, но очень приятный и хороший. и богатый еще, но стены дома коричневые",
    // Замените URL ниже на свою картинку Ромы
    image: "https://www.5.ua/media/pictures/400x266/216366.jpg?t=1619681074",
    color: "bg-yellow-100"
  },
  {
    id: 2,
    name: "Кандидат №2",
    description: "Мужчина, 19 лет. Молод, полон сил, колени не хрустят, день начинает с пива, очваровательный малолетний долбаеб",
    // Замените URL ниже на свою картинку Ромы
    image: "https://memepedia.ru/wp-content/uploads/2017/08/%D0%BD%D0%B5-%D1%85%D0%BE%D1%87%D1%83-%D0%BD%D0%B5-%D0%B1%D1%83%D0%B4%D1%83-1.png",
    color: "bg-blue-100"
  },
  {
    id: 3,
    name: "Кандидат №3",
    description: "Одноклассник и его друг. Подкатывают к тебе тоже вдвоем одновременно, друзья же",
    // Замените URL ниже на свою картинку Ромы
    image: "https://the-flow.ru/uploads/images/resize/830x0/adaptiveResize/09/56/25/91/65/26452c340cd7.jpg",
    color: "bg-purple-100"
  },
  {
    id: 4,
    name: "Кандидат №4",
    description: "Нормальная, семейная, амбициозная, приятная в общении девушка",
    // Замените URL ниже на свою картинку Ромы
    image: "https://img.freepik.com/free-photo/young-woman-portrait-outdoor_624325-3435.jpg?semt=ais_hybrid&w=740&q=80",
    color: "bg-orange-100"
  },
  {
    id: 6,
    name: "Кандидат",
    description: "Рома, умеет чинить краны, предпочитает тариф [вместе], подходит и тебе, и маме",
    // Замените URL ниже на свою картинку Ромы
    image: "https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/019cafd7-63d4-7da9-8d02-ad874eacaee7/1772966780250-019ccd0d-61a5-7a2d-9670-00e61991e642.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=af634fe044bd071ab4c5d356fdace60f%2F20260308%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260308T104620Z&X-Amz-Expires=3600&X-Amz-Signature=031b4a4a9d31b571517d9dad105be9e18490462e12d5728e2d559307b9862536&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    color: "bg-pink-100"
  }
];

export default function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'swipe' | 'no_matches' | 'wait_a_minute' | 'match'>('start');
  const [quizIndex, setQuizIndex] = useState(0);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  };

  const handleQuizAnswer = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setStep('swipe');
    }
  };

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    
    setTimeout(() => {
      if (candidateIndex === 4) {
        if (dir === 'right') {
          triggerConfetti();
          setStep('match');
        } else {
          // Если свайпает влево на последнем кандидате (тебе)
          alert('Эй, ну куда влево-то?! А ну свайпай вправо!');
          setCandidateIndex(4);
        }
      } else {
        if (candidateIndex === 3) {
          setStep('no_matches');
        } else {
          setCandidateIndex(prev => prev + 1);
        }
      }
      setDirection(null);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          
          {/* START SCREEN */}
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-3xl border-4 border-[#5C4A44] card-shadow flex flex-col items-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-[#5C4A44]">
                <Bot size={48} className="text-[#5C4A44]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2 text-pink-500 uppercase tracking-wider">
                  Подбор лучшего<br/>спутника по жизни
                </h1>
                <p className="text-lg font-medium opacity-80">
                  Привет, Каринушка-Христинушка, я твой ИИ-сват 🤖💖 Я подберу тебе идеала. Сначала заполним небольшую анкету про тебя, а потом я покажу лучших кандидатов (свайпай: право — лайк, лево — отказ).
                </p>
              </div>
              <button
                onClick={() => setStep('quiz')}
                className="w-full py-4 bg-pink-400 text-white text-xl font-bold rounded-2xl border-4 border-[#5C4A44] btn-shadow hover:bg-pink-500"
              >
                Погнали! 🚀
              </button>
            </motion.div>
          )}

          {/* QUIZ SCREEN */}
          {step === 'quiz' && (
            <motion.div
              key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white p-6 rounded-3xl border-4 border-[#5C4A44] card-shadow flex flex-col items-center text-center space-y-6"
            >
              <div className="w-full aspect-square rounded-2xl border-4 border-[#5C4A44] overflow-hidden bg-pink-50 relative">
                <img 
                  src={QUIZ_QUESTIONS[quizIndex].image} 
                  alt="Quiz illustration" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full border-2 border-[#5C4A44] font-bold text-sm">
                  {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                {QUIZ_QUESTIONS[quizIndex].question}
              </h2>
              <div className="w-full space-y-3">
                {QUIZ_QUESTIONS[quizIndex].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={handleQuizAnswer}
                    className="w-full py-4 px-6 bg-yellow-100 text-[#5C4A44] text-lg font-bold rounded-2xl border-4 border-[#5C4A44] btn-shadow hover:bg-yellow-200 text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SWIPE SCREEN */}
          {step === 'swipe' && (
            <motion.div
              key={`candidate-${candidateIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
                rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
              }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`${CANDIDATES[candidateIndex]?.color || 'bg-white'} p-6 rounded-3xl border-4 border-[#5C4A44] card-shadow flex flex-col items-center text-center space-y-6`}
            >
              <div className="w-full aspect-[4/5] rounded-2xl border-4 border-[#5C4A44] overflow-hidden bg-white relative">
                <img 
                  src={CANDIDATES[candidateIndex]?.image} 
                  alt={CANDIDATES[candidateIndex]?.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-left">
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {CANDIDATES[candidateIndex]?.name}
                  </h2>
                </div>
              </div>
              
              <p className="text-lg font-medium bg-white p-4 rounded-2xl border-4 border-[#5C4A44] w-full">
                {CANDIDATES[candidateIndex]?.description}
              </p>

              <div className="flex justify-center gap-6 w-full pt-2">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-20 h-20 bg-white text-red-500 rounded-full border-4 border-[#5C4A44] btn-shadow flex items-center justify-center hover:bg-red-50"
                >
                  <X size={40} strokeWidth={3} />
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-20 h-20 bg-white text-green-500 rounded-full border-4 border-[#5C4A44] btn-shadow flex items-center justify-center hover:bg-green-50"
                >
                  <Heart size={40} strokeWidth={3} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          )}

          {/* NO MATCHES SCREEN */}
          {step === 'no_matches' && (
            <motion.div
              key="no_matches"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white p-8 rounded-3xl border-4 border-[#5C4A44] card-shadow flex flex-col items-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-[#5C4A44]">
                <span className="text-5xl">💔</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#5C4A44]">
                  Ой...
                </h2>
                <p className="text-lg font-medium opacity-80">
                  Вы посмотрели всех, нам жаль что вам никто не подошел во всем мире :(
                </p>
              </div>
              <button
                onClick={() => setStep('wait_a_minute')}
                className="w-full py-4 bg-gray-400 text-white text-xl font-bold rounded-2xl border-4 border-[#5C4A44] btn-shadow hover:bg-gray-500"
              >
                Эхх
              </button>
            </motion.div>
          )}

          {/* WAIT A MINUTE SCREEN */}
          {step === 'wait_a_minute' && (
            <motion.div
              key="wait_a_minute"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white p-8 rounded-3xl border-4 border-[#5C4A44] card-shadow flex flex-col items-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-[#5C4A44]">
                <Sparkles size={48} className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#5C4A44]">
                  Погодите-ка! 🌪️
                </h2>
                <p className="text-lg font-medium opacity-80">
                  А погодите-ка, мы нашли еще одного кандидата, его прикрыло песком, подул ветер и сейчас стало лучше видно...
                </p>
              </div>
              <button
                onClick={() => {
                  setCandidateIndex(4);
                  setStep('swipe');
                }}
                className="w-full py-4 bg-yellow-400 text-[#5C4A44] text-xl font-bold rounded-2xl border-4 border-[#5C4A44] btn-shadow hover:bg-yellow-500"
              >
                Посмотреть его
              </button>
            </motion.div>
          )}

          {/* MATCH SCREEN */}
          {step === 'match' && (
            <motion.div
              key="match"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="bg-white p-8 rounded-3xl border-4 border-[#5C4A44] card-shadow flex flex-col items-center text-center space-y-8"
            >
              <div className="relative">
                <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center border-4 border-[#5C4A44]">
                  <Heart size={64} className="text-pink-500" fill="currentColor" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border-4 border-dashed border-pink-300 rounded-full"
                />
              </div>
              
              <div>
                <h1 className="text-5xl font-bold mb-4 text-pink-500 uppercase tracking-wider">
                  MATCH!
                </h1>
                <p className="text-xl font-medium">
                  Твой идеал найден. И он спешит поздравить тебя с 8 марта и пригласить на свидание. Он очень рад, что вы познакомились и теперь кто-то  называет его плесенью. До встречи на свидании 🍻✨
                </p>
              </div>

              <button
                onClick={() => window.open('https://t.me/akookoo', '_blank')}
                className="w-full py-4 bg-[#0088cc] text-white text-xl font-bold rounded-2xl border-4 border-[#5C4A44] btn-shadow hover:bg-[#0077b3] flex items-center justify-center gap-3"
              >
                <Send size={28} />
                Написать в тг
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
