
/*-------------------------------- Constants --------------------------------*/
// 8 winning combos -- if there is a value at each of the indices in an array, you have a winner
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  /*---------------------------- Variables (state) \----------------------------*/
  let board, turn, winner
  
  
  /*------------------------ Cached Element References ------------------------*/

  
  //// 2a) In a constant called `squareEls`, store the nine elements 
  //    representing the squares on the page
  
  //// 2b) In a constant called `messageEl`, store the element that displays the 
  //    //game's status on the page.
  //stores all squares in the board  
  const squareEls = document.querySelectorAll(".square")
  // console.log(squareEls.length)
  // stores message element
  const messageEl = document.querySelector("#message")
  // console.log(messageEl);
  // stores reset button
  const resetBtn = document.querySelector("#reset-button")
  // console.log(resetBtn)
  
  /*----------------------------- Event Listeners -----------------------------*/
  // adds event listener to each square of the board, calls handleClick func
  squareEls[0].addEventListener('click', handleClick)
  squareEls[1].addEventListener('click', handleClick)
  squareEls[2].addEventListener('click', handleClick)
  squareEls[3].addEventListener('click', handleClick)
  squareEls[4].addEventListener('click', handleClick)
  squareEls[5].addEventListener('click', handleClick)
  squareEls[6].addEventListener('click', handleClick)
  squareEls[7].addEventListener('click', handleClick)
  squareEls[8].addEventListener('click', handleClick)

  // adds event listener to reset button and calls init func
  resetBtn.addEventListener('click', init)
  

  /*-------------------------------- Functions --------------------------------*/
  init()
  // sets the board fresh
  function init(){
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = null
    render()
    resetBtn.setAttribute('hidden', true)
  }
  
// updates the board 
  function render(){
    // for each space on the board and index of the board array -- links the board array to the squareEls nodeList
    board.forEach((space, index) => {
      // playerChoise is the squareEl at the board index. So the 3rd space in the board array is the top right square on the board
      const playerChoice = squareEls[index]
      if (space === -1) return playerChoice.textContent = 'O'
      if (space === 1) return playerChoice.textContent = 'X'
      if (space === null) return playerChoice.textContent = ''
    });
    if (winner === null) {
      // need a variable to allow the message to change
      let player = ''
      if (turn === 1){
        player = 'Player 1'
      } else {
        player = 'Player 2'
      }
      messageEl.textContent = `${player}, make your choice:`
    } else if (winner === "T"){
      messageEl.textContent = `You tied!`
    } else if (winner === 1){
      messageEl.textContent = `Player 1 wins!`
    } else {
      messageEl.textContent = `Player 2 wins!`
    }
  }

  function handleClick(evt){
    // once a move is made, resetBtn appears
    resetBtn.removeAttribute('hidden')
    // need to access the number of the square to let the board array be updated. 
    const sqIdx = parseInt(evt.target.id[2])
    // console.log(evt)
    // console.log("sqIdx: ", sqIdx);
    if (winner !== null){
      // return (stop play) if there's a winner
      return
    } else if (board[sqIdx] !== null) {
      // return if there's already a move there 
    return
    } else {
      // otherwise -- update the board array with the sqIdx
      board.splice(sqIdx, 1, turn)
      // change the turn 
      turn = turn * -1
      // check if there's a winner
      winner = getWinner()
      // update the board
      render()
    }
    // console.log('turn: ', turn);
    // console.log('board: ', board);
  }

  function getWinner(){
    // makes an empty array to store the values in the board array 
    comboValues = [] 
    // get the absolute value of the board array at the first, second, and third winningCombo and push them into the comboValues array (they will be 1s)
    winningCombos.forEach(winningCombo => comboValues.push(Math.abs(board[winningCombo[0]] + board[winningCombo[1]] + board[winningCombo[2]])))
    // if comboValues includes 3, multiply turn again (this gets the message to display the correct winner)
    console.log('comboValues: ', comboValues);
    if (comboValues.includes(3)) {
      turn *= -1
      return turn
      // if board does not contain some null spaces, return tie 
    } else if (!board.some(spaces => spaces === null)){
      return "T"
      // in any other case, don't return anything (without this, the first click wins immediately)
    } else {
      return null
    }
  }


