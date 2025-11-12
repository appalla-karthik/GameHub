const puzzleGrid = document.getElementById("puzzleGrid");
const moveCountElement = document.getElementById("moveCount");

let tiles = [];
let moveCount = 0;

// Initialize puzzle
function initPuzzle() {
  tiles = [...Array(15).keys()].map(x => x + 1);
  tiles.push("");
  renderTiles();
}

// Render tiles to grid
function renderTiles() {
  puzzleGrid.innerHTML = "";
  tiles.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (value === "") tile.classList.add("empty");
    tile.textContent = value;
    tile.addEventListener("click", () => moveTile(index));
    puzzleGrid.appendChild(tile);
  });
}

// Move tile logic
function moveTile(index) {
  const emptyIndex = tiles.indexOf("");
  const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];

  // Ensure moves stay within grid
  if (index === emptyIndex - 1 && emptyIndex % 4 === 0) return;
  if (index === emptyIndex + 1 && index % 4 === 0) return;

  if (validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    moveCount++;
    moveCountElement.textContent = moveCount;
    renderTiles();
    checkWin();
  }
}

// Shuffle puzzle
function shuffleTiles() {
  moveCount = 0;
  moveCountElement.textContent = moveCount;
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  renderTiles();
}

// Check for win condition
function checkWin() {
  const winState = [...Array(15).keys()].map(x => x + 1).concat([""]);
  if (JSON.stringify(tiles) === JSON.stringify(winState)) {
    setTimeout(() => alert(`🎉 You Win! Moves: ${moveCount}`), 100);
  }
}

// Start game
document.addEventListener("DOMContentLoaded", initPuzzle);
