import React, { useState, useEffect } from "react";

const gridSize = 20;
const initialSnake = [{ x: 10, y: 10 }];
const initialDirection = "RIGHT";

const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState(initialDirection);
  const [food, setFood] = useState(generateFood());
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (gameRunning) {
      const interval = setInterval(moveSnake, 100);
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameRunning]);

  function generateFood() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }

  function moveSnake() {
    const newHead = { ...snake[0] };
    if (direction === "UP") newHead.y -= 1;
    if (direction === "DOWN") newHead.y += 1;
    if (direction === "LEFT") newHead.x -= 1;
    if (direction === "RIGHT") newHead.x += 1;

    if (checkCollision(newHead)) {
      setGameRunning(false);
      alert("¡Game Over!");
      return;
    }

    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function checkCollision(head) {
    return (
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    );
  }

  function startGame() {
    setShowMenu(false);
    setSnake(initialSnake);
    setDirection(initialDirection);
    setFood(generateFood());
    setScore(0);
    setGameRunning(true);
  }

  if (showMenu) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>🐍 Snake Game</h1>
        <button
          onClick={startGame}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Comenzar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1>🐍 Snake Game</h1>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Puntuación: {score}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gridTemplateRows: `repeat(${gridSize}, 20px)`,
          gap: "1px",
          backgroundColor: "black",
          margin: "20px auto",
          padding: "5px",
          border: "2px solid black",
          width: `${gridSize * 20 + 2}px`, // Ajuste exacto del tamaño
          height: `${gridSize * 20 + 2}px`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={index}
              style={{
                width: "20px",
                height: "20px",
                boxSizing: "border-box",
                border: "1px solid #444",
                backgroundColor: isSnake ? "green" : isFood ? "red" : "#ddd",
              }}
            />
          );
        })}
      </div>
      <div style={{ marginTop: "20px" }}>
        <div>
          <button onClick={() => setDirection("UP")} style={buttonStyle}>
            ⬆️
          </button>
        </div>
        <div>
          <button onClick={() => setDirection("LEFT")} style={buttonStyle}>
            ⬅️
          </button>
          <button onClick={() => setDirection("DOWN")} style={buttonStyle}>
            ⬇️
          </button>
          <button onClick={() => setDirection("RIGHT")} style={buttonStyle}>
            ➡️
          </button>
        </div>
      </div>
      <button
        onClick={startGame}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        {gameRunning ? "Reiniciar" : "Iniciar"} Juego
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "10px",
  fontSize: "20px",
  margin: "5px",
  cursor: "pointer",
  backgroundColor: "#f8f9fa",
  border: "2px solid #ccc",
  borderRadius: "5px",
};

export default SnakeGame;
