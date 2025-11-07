import { useEffect, useMemo, useRef, useState } from "react";

const QUESTIONS = {
  GK: [
    { q: "Which planet is known as the Red Planet?", o: ["Earth", "Venus", "Mars", "Jupiter"], a: "Mars" },
    { q: "Who wrote the national anthem of India?", o: ["Rabindranath Tagore", "Sarojini Naidu", "Bankim Chandra", "Mahatma Gandhi"], a: "Rabindranath Tagore" },
    { q: "Which animal is called the 'Ship of the Desert'?", o: ["Horse", "Camel", "Elephant", "Donkey"], a: "Camel" },
    { q: "What is the capital of Australia?", o: ["Canberra", "Sydney", "Melbourne", "Perth"], a: "Canberra" },
    { q: "Which country gifted the Statue of Liberty to the USA?", o: ["France", "Germany", "Italy", "Spain"], a: "France" },
    { q: "How many continents are there on Earth?", o: ["5", "6", "7", "8"], a: "7" },
    { q: "Which ocean is the largest?", o: ["Indian", "Arctic", "Atlantic", "Pacific"], a: "Pacific" },
    { q: "Who was the first person to walk on the Moon?", o: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], a: "Neil Armstrong" },
    { q: "Which is the national animal of India?", o: ["Lion", "Tiger", "Elephant", "Leopard"], a: "Tiger" },
    { q: "In which year did India get independence?", o: ["1947", "1950", "1945", "1960"], a: "1947" },
    { q: "Which sport is known as the 'King of Sports'?", o: ["Cricket", "Football", "Hockey", "Tennis"], a: "Football" },
    { q: "Who is known as the 'Father of the Nation' in India?", o: ["Nehru", "Gandhi", "Tagore", "Patel"], a: "Gandhi" },
    { q: "Which festival is known as the festival of lights?", o: ["Eid", "Diwali", "Holi", "Christmas"], a: "Diwali" },
    { q: "Which is the smallest continent?", o: ["Europe", "Australia", "Africa", "Antarctica"], a: "Australia" },
    { q: "What currency is used in Japan?", o: ["Yen", "Won", "Dollar", "Peso"], a: "Yen" },
  ],
  Science: [
    { q: "Which gas do humans exhale?", o: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"], a: "Carbon dioxide" },
    { q: "Which part of the plant makes food?", o: ["Root", "Stem", "Leaf", "Flower"], a: "Leaf" },
    { q: "Water boils at what temperature?", o: ["90°C", "100°C", "110°C", "80°C"], a: "100°C" },
    { q: "Which vitamin is produced in sunlight?", o: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B12"], a: "Vitamin D" },
    { q: "Which planet is the largest?", o: ["Saturn", "Earth", "Jupiter", "Neptune"], a: "Jupiter" },
    { q: "Which organ purifies blood?", o: ["Heart", "Liver", "Kidney", "Lungs"], a: "Kidney" },
    { q: "Which gas is essential for breathing?", o: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"], a: "Oxygen" },
    { q: "What part of the cell contains DNA?", o: ["Cytoplasm", "Nucleus", "Membrane", "Ribosome"], a: "Nucleus" },
    { q: "How many bones are in a human body?", o: ["206", "208", "210", "201"], a: "206" },
    { q: "Which planet has rings?", o: ["Jupiter", "Saturn", "Mars", "Venus"], a: "Saturn" },
    { q: "Which force pulls objects to Earth?", o: ["Gravity", "Magnetism", "Friction", "Pressure"], a: "Gravity" },
    { q: "Which blood type is the universal donor?", o: ["O+", "O−", "AB+", "AB−"], a: "O−" },
    { q: "Which organ helps in respiration?", o: ["Lungs", "Heart", "Liver", "Brain"], a: "Lungs" },
    { q: "Which is the smallest bone in the human body?", o: ["Stapes", "Femur", "Tibia", "Ulna"], a: "Stapes" },
    { q: "Which planet is closest to the Sun?", o: ["Earth", "Venus", "Mercury", "Mars"], a: "Mercury" },
  ],
  Tech: [
    { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "High Tech Machine Language", "Home Tool Markup Language", "Hyperlink Text Mode Language"], a: "Hyper Text Markup Language" },
    { q: "CPU stands for?", o: ["Central Processing Unit", "Computer Process Unit", "Central Program Unit", "Control Process Unit"], a: "Central Processing Unit" },
    { q: "What does AI stand for?", o: ["Artificial Intelligence", "Automated Input", "Algorithmic Interface", "Advanced Innovation"], a: "Artificial Intelligence" },
    { q: "What does CSS stand for?", o: ["Cascading Style Sheets", "Computer Style Syntax", "Creative Style System", "Code Styling Script"], a: "Cascading Style Sheets" },
    { q: "Which company developed Windows?", o: ["Microsoft", "Apple", "IBM", "Google"], a: "Microsoft" },
    { q: "What does SQL stand for?", o: ["Structured Query Language", "System Query List", "Sequential Query Logic", "Standard Question Language"], a: "Structured Query Language" },
    { q: "What does JS stand for?", o: ["JavaSource", "JavaScript", "JustScript", "JavaSyntax"], a: "JavaScript" },
    { q: "What does HTTP stand for?", o: ["Hyper Text Transfer Protocol", "High Tech Transfer Program", "Hyper Text Transmission Process", "High Transfer Text Protocol"], a: "Hyper Text Transfer Protocol" },
    { q: "Which device connects computers to a network?", o: ["Router", "Monitor", "Keyboard", "Speaker"], a: "Router" },
    { q: "Which company owns WhatsApp?", o: ["Meta", "Google", "Telegram", "Snapchat"], a: "Meta" },
    { q: "What does Wi-Fi stand for?", o: ["Wireless Fidelity", "Web Finder", "Wide Frequency", "Wireless Finder"], a: "Wireless Fidelity" },
    { q: "What is the shortcut key for Copy?", o: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + P"], a: "Ctrl + C" },
    { q: "Which device stores permanent memory?", o: ["RAM", "Hard Disk", "Cache", "CPU"], a: "Hard Disk" },
    { q: "Which language is used for styling web pages?", o: ["CSS", "HTML", "Python", "C++"], a: "CSS" },
    { q: "Which language runs in a web browser?", o: ["JavaScript", "Python", "C#", "PHP"], a: "JavaScript" },
  ],
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function App() {
  const SECONDS = 15;
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cat, setCat] = useState(null);
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(SECONDS);
  const [report, setReport] = useState(false);
  const timer = useRef(null);
  const quiz = useMemo(() => cat ? shuffle(QUESTIONS[cat]).slice(0, 15) : [], [cat]);
  const q = quiz[i];

  useEffect(() => {
    if (!started || report) return;
    setTime(SECONDS);
    clearInterval(timer.current);
    timer.current = setInterval(() => setTime((t) => {
      if (t <= 1) { clearInterval(timer.current); handleTimeout(); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer.current);
  }, [i, started, report]);

  function handleTimeout() {
    if (i + 1 < quiz.length) setI((x) => x + 1);
    else handleFinish();
  }

  function handlePick(opt) {
    if (sel) return;
    setSel(opt);
    clearInterval(timer.current);
    const correct = opt === q.a;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setSel(null);
      if (i + 1 < quiz.length) setI((x) => x + 1);
      else handleFinish();
    }, 800);
  }

  async function handleFinish() {
    setReport(true);
    clearInterval(timer.current);
    const accuracy = Math.round((score / quiz.length) * 100);
    await fetch("http://localhost:4000/api/save-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category: cat, score, total: quiz.length, accuracy }),
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white flex justify-center p-4">
      <div className="w-full max-w-3xl space-y-5">
        <h1 className="text-3xl font-bold text-center">QuickQuiz <span className="text-sky-400">⚡</span></h1>

        {!loggedIn && (
          <div className="p-6 text-center border border-slate-700 bg-slate-900/70 rounded-2xl space-y-4">
            <p className="text-slate-300">Enter your name to begin:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="px-4 py-2 w-full max-w-xs rounded-lg bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-sky-400 outline-none text-center"
            />
            <button
              onClick={() => name.trim() && setLoggedIn(true)}
              className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg"
            >
              Continue
            </button>
          </div>
        )}

        {loggedIn && !cat && !started && (
          <div className="p-6 text-center border border-slate-700 bg-slate-900/70 rounded-2xl space-y-3">
            <p>Hi <span className="text-sky-400 font-medium">{name}</span> 👋 Choose your category:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(QUESTIONS).map((c) => (
                <button key={c} onClick={() => setCat(c)} className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-black rounded-lg font-medium">{c}</button>
              ))}
            </div>
          </div>
        )}

        {cat && started && !report && q && (
          <div className="p-6 border border-slate-700 bg-slate-900/70 rounded-2xl space-y-4">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${time <= 5 ? "bg-red-500" : "bg-green-400"} transition-all`} style={{ width: `${(time / SECONDS) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Q {i + 1}/15</span>
              <span>{time}s</span>
            </div>
            <h2 className="text-lg font-semibold">{q.q}</h2>
            <div className="grid gap-3">
              {q.o.map((opt, idx) => (
                <button key={idx} onClick={() => handlePick(opt)} disabled={!!sel}
                  className={`px-4 py-3 text-left rounded-lg border transition ${
                    sel === opt
                      ? opt === q.a ? "bg-green-600/30 border-green-400"
                      : "bg-red-600/30 border-red-400"
                      : "bg-slate-800 border-slate-700 hover:border-slate-500"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {cat && !started && !report && (
          <div className="text-center">
            <button onClick={() => setStarted(true)} className="px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-lg font-medium">Start Quiz</button>
          </div>
        )}

        {report && (
          <div className="p-6 border border-slate-700 bg-slate-900/70 rounded-2xl text-center space-y-3">
            <h2 className="text-2xl font-bold">Quiz Complete ✅</h2>
            <p>Thanks <span className="text-sky-400">{name}</span>!</p>
            <p>Score: {score}/15 | Accuracy: {Math.round((score / 15) * 100)}%</p>
            <p className="text-sm text-slate-400">(Your result was saved to <code>scores.txt</code>)</p>
            <button onClick={() => { setCat(null); setStarted(false); setReport(false); setI(0); setScore(0); }} className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-black rounded-lg font-medium">Home</button>
          </div>
        )}
      </div>
    </div>
  );
}
