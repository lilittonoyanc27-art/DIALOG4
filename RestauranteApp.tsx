import React, { useState } from 'react';
import { 
  Utensils, 
  User, 
  MessageSquare, 
  Play, 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  Trophy, 
  RefreshCcw,
  Coffee,
  Pizza,
  IceCream,
  Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data ---

const DIALOGUE = [
  {
    speaker: "José",
    spanish: "¡Hola, Paulina! Tengo mucha hambre. ¿Quieres un bistec?",
    armenian: "Ողջույն, Պաուլինա՛: Ես շատ սոված եմ: Սթեյք ուզո՞ւմ ես:",
    options: ["un bistec", "una carne", "unos panes"],
    correct: "un bistec",
    missingPart: "¡Hola, Paulina! Tengo mucha hambre. ¿Quieres ___?",
    item: "🥩"
  },
  {
    speaker: "Paulina",
    spanish: "¡Hola! No, hoy no quiero carne. Quiero una paella con mariscos.",
    armenian: "Ո՛չ, այսօր միս չեմ ուզում: Ծովամթերքով պաելյա եմ ուզում:",
    options: ["una paella", "un arroz", "unas sopas"],
    correct: "una paella",
    missingPart: "¡Hola! No, hoy no quiero carne. Quiero ___ con mariscos.",
    item: "🥘"
  },
  {
    speaker: "José",
    spanish: "¡Qué buena idea! Yo también quiero paella entonces. Pero primero tengo que beber algo, tengo mucha sed.",
    armenian: "Ի՜նց լավ գաղափար է: Դե ուրեմն ես նույնպես պաելյա եմ ուզում: Բայց նախ ես պետք է մի բան խմեմ, շատ ծարավ եմ:",
    options: ["mucha sed", "mucha hambre", "mucha sueño"],
    correct: "mucha sed",
    missingPart: "¡Qué buena idea! Yo también quiero paella entonces. Pero primero tengo que beber algo, tengo ___.",
    item: "💧"
  },
  {
    speaker: "Paulina",
    spanish: "Yo también tengo sed. Quiero un jugo de naranja.",
    armenian: "Ես նույնպես ծարավ եմ: Նարնջի հյութ եմ ուզում:",
    options: ["un jugo", "una agua", "unos refrescos"],
    correct: "un jugo",
    missingPart: "Yo también tengo sed. Quiero ___ de naranja.",
    item: "🍊"
  },
  {
    speaker: "José",
    spanish: "¡Perfecto! Y de postre… ¿quieres un helado de chocolate?",
    armenian: "Հիանալի է: Իսկ դեսերտին... շոկոլադե պաղպաղակ ուզո՞ւմ ես:",
    options: ["un helado", "una tarta", "unos dulces"],
    correct: "un helado",
    missingPart: "¡Perfecto! Y de postre… ¿quieres ___ de chocolate?",
    item: "🍦"
  },
  {
    speaker: "Paulina",
    spanish: "¡Sí! Tengo ganas de un helado frío. Pero, José, tenemos que estudiar después de comer. Mañana hay examen.",
    armenian: "Այո՛: Սառը պաղպաղակի ցանկություն ունեմ: Բայց, Խոսե՛, ուտելուց հետո մենք պետք է սովորենք: Վաղը քննություն կա:",
    options: ["un helado", "una pizza", "un examen"],
    correct: "un helado",
    missingPart: "¡Sí! Tengo ganas de ___ frío. Pero, José, tenemos que estudiar después de comer. Mañana hay examen.",
    item: "❄️"
  },
  {
    speaker: "José",
    spanish: "Es verdad. Tengo que sacar una buena nota. ¡Vamos a comer rápido!",
    armenian: "Ճիշտ է: Ես պետք է լավ նշան ստանամ: Արի՛ արագ ուտենք:",
    options: ["una buena nota", "un buen libro", "unos amigos"],
    correct: "una buena nota",
    missingPart: "Es verdad. Tengo que sacar ___. ¡Vamos a comer rápido!",
    item: "📝"
  }
];

// --- Components ---

export default function RestauranteApp() {
  const [view, setView] = useState<'text' | 'game' | 'result'>('text');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState({ "José": 0, "Paulina": 0 });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentLine = DIALOGUE[step];
  const activePlayer = currentLine.speaker;

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === currentLine.correct) {
      setFeedback('correct');
      setScore(prev => ({ ...prev, [activePlayer]: prev[activePlayer as keyof typeof prev] + 1 }));
      setTimeout(() => {
        if (step < DIALOGUE.length - 1) {
          setStep(prev => prev + 1);
          setFeedback(null);
          setSelectedOption(null);
        } else {
          setView('result');
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setStep(0);
    setScore({ "José": 0, "Paulina": 0 });
    setFeedback(null);
    setSelectedOption(null);
    setView('game');
  };

  return (
    <div className="min-h-screen bg-orange-50 text-slate-900 font-sans selection:bg-orange-200">
      <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-[32px] shadow-xl border-4 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 rotate-3">
              <Utensils className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-orange-950">Ռեստորանում</h1>
              <p className="text-[10px] font-extrabold text-orange-600 uppercase tracking-[0.2em]">En el restaurante</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setView('text')}
              className={`px-4 py-2 rounded-full font-black text-xs transition-all ${view === 'text' ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-100 text-orange-600'}`}
            >
              <BookOpen className="w-4 h-4 inline mr-1" /> ՏԵՔՍՏ
            </button>
            <button 
              onClick={() => setView('game')}
              className={`px-4 py-2 rounded-full font-black text-xs transition-all ${view === 'game' ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-100 text-orange-600'}`}
            >
              <Play className="w-4 h-4 inline mr-1" /> ԽԱՂ
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {view === 'text' && (
            <motion.div 
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[40px] p-8 shadow-2xl border-b-8 border-orange-200">
                <h2 className="text-2xl font-black text-orange-900 mb-8 border-b-4 border-orange-100 pb-4 italic">
                  En el restaurante: ¿Qué quieres comer? <br/>
                  <span className="text-lg font-bold text-orange-400">(Ռեստորանում. Ի՞նչ ես ուզում ուտել)</span>
                </h2>
                
                <div className="space-y-8">
                  {DIALOGUE.map((line, i) => (
                    <div key={i} className={`flex gap-4 ${line.speaker === 'Paulina' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${line.speaker === 'José' ? 'bg-blue-500' : 'bg-rose-500'}`}>
                        <User className="text-white w-6 h-6" />
                      </div>
                      <div className={`p-6 rounded-[24px] max-w-[80%] shadow-sm border ${line.speaker === 'José' ? 'bg-blue-50 border-blue-100' : 'bg-rose-50 border-rose-100'}`}>
                        <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">{line.speaker}</p>
                        <p className="text-lg font-bold text-slate-800 mb-2 leading-tight">{line.spanish}</p>
                        <p className="text-sm font-medium text-slate-500 italic">({line.armenian})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setView('game')}
                className="w-full bg-orange-500 text-white p-6 rounded-[32px] font-black text-xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border-b-8 border-orange-700"
              >
                ԱՆՑՆԵԼ ԽԱՂԻՆ <ChevronRight />
              </button>
            </motion.div>
          )}

          {view === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-8"
            >
              {/* Game Scene */}
              <div className="flex-1 bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border-b-8 border-orange-200 relative overflow-hidden flex flex-col items-center justify-center">
                
                {/* Decorative Elements */}
                <div className="absolute top-8 left-8 opacity-10 rotate-12"><Pizza className="w-24 h-24" /></div>
                <div className="absolute bottom-8 right-8 opacity-10 -rotate-12"><Coffee className="w-24 h-24" /></div>
                <div className="absolute top-1/2 right-4 opacity-10"><IceCream className="w-16 h-16" /></div>
                <div className="absolute bottom-1/4 left-4 opacity-10"><Apple className="w-16 h-16" /></div>

                {/* Turn Indicator */}
                <div className="absolute top-6 flex items-center gap-4 bg-slate-50 px-6 py-2 rounded-full border-2 border-slate-100 shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ՀԵՐԹԸ</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white font-black text-sm ${activePlayer === 'José' ? 'bg-blue-500' : 'bg-rose-500'}`}>
                    <User className="w-3 h-3" /> {activePlayer.toUpperCase()}
                  </div>
                </div>

                {/* Question Bubble */}
                <div className="relative z-10 w-full max-w-2xl mt-8">
                  <div className={`p-8 rounded-[40px] border-4 border-dashed shadow-inner text-center space-y-4 ${activePlayer === 'José' ? 'bg-blue-50 border-blue-200' : 'bg-rose-50 border-rose-200'}`}>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 leading-relaxed">
                      {currentLine.missingPart.split('___').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className={`inline-block min-w-[140px] border-b-4 mx-2 italic px-2 transition-all ${feedback === 'correct' ? 'text-green-600 border-green-400' : 'text-orange-600 border-orange-400'}`}>
                              {selectedOption || "___"}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </h2>
                    <p className="text-lg font-bold text-slate-400 italic">({currentLine.armenian})</p>
                  </div>
                  
                  {/* Item Pop-up */}
                  <AnimatePresence>
                    {feedback === 'correct' && (
                      <motion.div 
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="absolute -top-12 -right-4 text-7xl bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-200 z-20"
                      >
                        {currentLine.item}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentLine.options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(opt)}
                    className={`p-6 rounded-[32px] font-black text-xl transition-all border-b-8 shadow-xl ${
                      selectedOption === opt && feedback === 'correct'
                        ? 'bg-green-500 border-green-700 text-white'
                        : selectedOption === opt && feedback === 'wrong'
                          ? 'bg-red-500 border-red-700 text-white'
                          : 'bg-white border-orange-100 text-orange-900 hover:bg-orange-50 hover:border-orange-300'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              {/* Score Board */}
              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-2xl border-2 border-blue-200">
                  <User className="text-blue-600" />
                  <div>
                    <p className="text-[10px] font-black text-blue-400 uppercase">JOSÉ</p>
                    <p className="text-xl font-black text-blue-700">{score["José"]} միավոր</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-rose-100 px-6 py-3 rounded-2xl border-2 border-rose-200">
                  <User className="text-rose-600" />
                  <div>
                    <p className="text-[10px] font-black text-rose-400 uppercase">PAULINA</p>
                    <p className="text-xl font-black text-rose-700">{score.Paulina} միավոր</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="relative">
                <div className="w-56 h-56 bg-orange-500 rounded-[48px] flex items-center justify-center shadow-2xl rotate-6 relative z-10 border-8 border-orange-400">
                  <Trophy className="w-28 h-28 text-white fill-white" />
                </div>
                <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-30 animate-pulse" />
              </div>

              <div className="space-y-6">
                <h2 className="text-6xl font-black tracking-tighter uppercase italic text-orange-950">ԲԱՐԻ ԱԽՈՐԺԱԿ!</h2>
                <div className="p-8 bg-white rounded-[32px] border border-orange-100 shadow-xl grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">JOSÉ</p>
                    <p className="text-5xl font-black text-blue-600">{score["José"]}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">PAULINA</p>
                    <p className="text-5xl font-black text-rose-600">{score.Paulina}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-slate-600">
                  Դուք հիանալի պատվիրեցիք ձեր ճաշը: <br/>
                  Ժամանակն է սովորելու քննության համար!
                </p>
              </div>

              <button 
                onClick={resetGame}
                className="bg-orange-600 text-white px-16 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-4 border-b-8 border-orange-800"
              >
                <RefreshCcw /> ՆՈՐԻՑ ԽԱՂԱԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-orange-50">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Spanish Learning • Restaurant Edition
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
