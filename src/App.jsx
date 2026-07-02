import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BookOpen, Brain, Globe2, FileText, PlayCircle, Trophy, ArrowLeft } from "lucide-react";
import { classes, logicActivities, curiosities } from "./content";
import "./style.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedClassId, setSelectedClassId] = useState("c1");
  const [selectedWorldId, setSelectedWorldId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [answers, setAnswers] = useState({});

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const selectedWorld = selectedClass?.worlds.find(w => w.id === selectedWorldId);
  const selectedLesson = selectedWorld?.lessons.find(l => l.id === selectedLessonId);

  const score = useMemo(() => {
    if (!selectedLesson) return 0;
    return selectedLesson.quiz.reduce((acc, q, index) => acc + (answers[index] === q.answer ? 1 : 0), 0);
  }, [answers, selectedLesson]);

  function openLesson(worldId, lessonId) {
    setSelectedWorldId(worldId);
    setSelectedLessonId(lessonId);
    setAnswers({});
    setScreen("lesson");
  }

  function printWorksheet() {
    window.print();
  }

  if (screen === "home") {
    return (
      <main className="app">
        <section className="hero">
          <div className="badge">MVP v0.1</div>
          <h1>EduQuest</h1>
          <p>O aventură educațională pentru copiii din ciclul primar: video, explicații simple, quiz și fișe de lucru.</p>
          <button className="primary" onClick={() => setScreen("learn")}>Pornește aventura</button>
        </section>

        <section className="grid">
          <Card icon={<BookOpen />} title="Învață" text="Lecții scurte, clare și vizuale." onClick={() => setScreen("learn")} />
          <Card icon={<Brain />} title="Gândește" text="Logică, atenție și provocări." onClick={() => setScreen("logic")} />
          <Card icon={<Globe2 />} title="Descoperă" text="Curiozități care trezesc interesul." onClick={() => setScreen("discover")} />
          <Card icon={<FileText />} title="Fișe PDF" text="Exerciții de printat acasă." onClick={() => setScreen("learn")} />
        </section>
      </main>
    );
  }

  if (screen === "learn") {
    return (
      <main className="app">
        <TopBar title="Alege o aventură" back={() => setScreen("home")} />
        <div className="classPicker">
          {classes.map(c => (
            <button key={c.id} className={selectedClassId === c.id ? "chip active" : "chip"} onClick={() => setSelectedClassId(c.id)}>
              {c.name}
            </button>
          ))}
        </div>

        <section className="worlds">
          {selectedClass.worlds.map(world => (
            <article className="world" key={world.id}>
              <div>
                <p className="subject">{world.subject}</p>
                <h2>{world.name}</h2>
                <p>{world.description}</p>
              </div>
              <div className="lessonList">
                {world.lessons.map(lesson => (
                  <button key={lesson.id} className="lessonButton" onClick={() => openLesson(world.id, lesson.id)}>
                    <span>{lesson.title}</span>
                    <small>{lesson.duration} · {lesson.level}</small>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }

  if (screen === "lesson" && selectedLesson) {
    return (
      <main className="app">
        <TopBar title={selectedLesson.title} back={() => setScreen("learn")} />

        <section className="lessonHero">
          <div>
            <p className="subject">{selectedWorld.subject}</p>
            <h1>{selectedLesson.title}</h1>
            <p>{selectedLesson.goal}</p>
          </div>
          <button className="secondary"><PlayCircle size={20}/> Vezi lecția</button>
        </section>

        <section className="panel">
          <h2>Scenariu video</h2>
          <p className="script">{selectedLesson.videoScript}</p>
        </section>

        <section className="panel">
          <h2>Explicație</h2>
          {selectedLesson.explanation.map((line, i) => <p key={i}>{line}</p>)}
          <div className="example"><strong>Exemplu:</strong> {selectedLesson.example}</div>
        </section>

        <section className="panel">
          <h2>Quiz rapid</h2>
          {selectedLesson.quiz.map((q, index) => (
            <div className="question" key={q.question}>
              <h3>{q.question}</h3>
              <div className="options">
                {q.options.map(option => (
                  <button
                    key={option}
                    className={answers[index] === option ? "option selected" : "option"}
                    onClick={() => setAnswers({...answers, [index]: option})}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="score"><Trophy size={20}/> Scor: {score}/{selectedLesson.quiz.length}</div>
        </section>

        <section className="panel worksheet">
          <h2>Fișă de lucru</h2>
          {selectedLesson.printable.map((item, i) => <p key={i}>{i + 1}. {item}</p>)}
          <button className="primary noPrint" onClick={printWorksheet}>Printează / Salvează PDF</button>
        </section>

        <section className="panel parent">
          <h2>Sfat pentru părinte</h2>
          <p>{selectedLesson.parentTip}</p>
        </section>
      </main>
    );
  }

  if (screen === "logic") {
    return (
      <main className="app">
        <TopBar title="Gândește" back={() => setScreen("home")} />
        {logicActivities.map(a => (
          <section className="panel" key={a.id}>
            <h2>{a.title}</h2>
            <p>{a.description}</p>
            <details><summary>Vezi răspunsul</summary><p>{a.answer}</p></details>
          </section>
        ))}
      </main>
    );
  }

  if (screen === "discover") {
    return (
      <main className="app">
        <TopBar title="Descoperă" back={() => setScreen("home")} />
        {curiosities.map(c => (
          <section className="panel" key={c.id}>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
          </section>
        ))}
      </main>
    );
  }

  return null;
}

function Card({ icon, title, text, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </button>
  );
}

function TopBar({ title, back }) {
  return (
    <header className="topbar">
      <button className="back" onClick={back}><ArrowLeft size={18}/> Înapoi</button>
      <strong>{title}</strong>
    </header>
  );
}

createRoot(document.getElementById("root")).render(<App />);
