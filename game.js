document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
  
    // Create cells for the board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  
    // Function to handle cell clicks
    function handleCellClick(event) {
      const index = event.target.getAttribute('data-index');
  
      // Check if the cell is empty and the game is still ongoing
      if (gameBoard[index] === '' && !isGameFinished()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
  
        // Check for a winner
        if (checkWinner()) {
          message.textContent = `${currentPlayer} wins!`;
        } else if (isBoardFull()) {
          message.textContent = 'It\'s a tie!';
        } else {
          // Switch to the next player
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          message.textContent = `${currentPlayer}'s turn`;
        }
      }
    }
  
    // Function to check for a winner
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          highlightWinnerCells(pattern);
          return true;
        }
      }
  
      return false;
    }
  
    // Function to highlight the cells of the winning combination
    function highlightWinnerCells(pattern) {
      for (const index of pattern) {
        board.children[index].classList.add('winner');
      }
    }
  
    // Function to check if the board is full
    function isBoardFull() {
      return !gameBoard.includes('');
    }
  
    // Function to check if the game is finished
    function isGameFinished() {
      return checkWinner() || isBoardFull();
    }
  });
  