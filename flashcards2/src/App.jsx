import {useState} from 'react';
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function moveLeft() {
    setCount((prevCount) => (prevCount === 0 ? 9 : prevCount - 1));
    setIsFlipped(false); // Reset flip state when moving to a new flashcard
  }

  function moveRight() {
    setCount((prevCount) => (prevCount === 9 ? 0 : prevCount + 1));
    setIsFlipped(false); // Reset flip state when moving to a new flashcard
  }

  const flashcards = [
    { question: "What is the First Amendment?", answer: "Freedom of speech, religion, press, assembly, and petition.", image: "../public/flag.webp" },
    { question: "What is the Second Amendment?", answer: "Right to bear arms.", image: "../public/flag.webp" },
    { question: "What is the Third Amendment?", answer: "Protection from quartering of troops.", image: "../public/flag.webp" },
    { question: "What is the Fourth Amendment?", answer: "Protection from unreasonable search and seizure.", image: "../public/flag.webp" },
    { question: "What is the Fifth Amendment?", answer: "Protection of rights to life, liberty, and property.", image: "../public/flag.webp" },
    { question: "What is the Sixth Amendment?", answer: "Rights of accused persons in criminal cases.", image: "../public/flag.webp" },
    { question: "What is the Seventh Amendment?", answer: "Rights in civil cases.", image: "../public/flag.webp" },
    { question: "What is the Eighth Amendment?", answer: "Excessive bail, fines, and punishment forbidden.", image: "../public/flag.webp" },
    { question: "What is the Ninth Amendment?", answer: "Other rights kept by the people.", image: "../public/flag.webp" },
    { question: "What is the Tenth Amendment?", answer: "Powers of the states and people.", image: "../public/flag.webp" }
  ];

  return (
    <div className="app">
      <h1>Know your rights!</h1>
      <h2>Flip through the flashcards to learn about your rights as they are granted to you by the Bill of Rights.</h2>
      <p className="counter">Count: {count + 1}</p>
      <Flashcard
        question={flashcards[count].question}
        answer={flashcards[count].answer}
        image={flashcards[count].image}
        isFlipped={isFlipped}
        flip={() => setIsFlipped(!isFlipped)}
      />
      <div className="button-wrapper">
        <button className="button-move-left" onClick={moveLeft}>Previous Card</button>
        <button className="button-move-right" onClick={moveRight}>Next Card</button>
      </div>
    </div>
  );
}

function Flashcard({ question, answer, image, isFlipped, flip, onNext, onBack }) {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null);
  
  const handleGuessSubmit = () => { 
    if (guess.toLowerCase() === answer.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }
  }

  return (
    <div className="flashcard">
      {isFlipped ? (
        <div className="back-of-card">
          <p>{answer}</p>
          <img src={image} alt={question} />
          <button className="flip-button" onClick={flip}>Flip the card</button>
        </div>
      ) : (
        <div>
          <h3>{question}</h3>
          <div className="img-form-wrapper">
            <img src={image} alt={question} />
            <input
              type="text"
              placeholder="Enter your guess"
              value={guess}
              className = "input-form"
              onChange={(e) => setGuess(e.target.value)}
            />
            <button className="submit-button" onClick={handleGuessSubmit}>Submit</button>
          </div>
          <button className="flip-button" onClick={flip}>Flip the card</button>
          {feedback && <p>{feedback}</p>}
        </div>
      )}
    </div>
  );
}

export default App;