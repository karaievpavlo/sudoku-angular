import { Injectable } from "@angular/core";
import { TBoard } from "../common/types/board.type";
import { TEmptySpot } from "../common/types/empty-spot.type";
import { BLANK_BOARD } from "../common/objects/blank-board.object";
import { Difficult } from "../common/enums/difficult.enum";
import { BehaviorSubject, Observable } from "rxjs";
import { DifficultHoles } from "../common/enums/difficult-holes.enum";

@Injectable()
export class SudokuService {
  private readonly difficult$ = new BehaviorSubject<Difficult>(Difficult.Easy);
  private readonly board$ = new BehaviorSubject<TBoard>(BLANK_BOARD);
  private counter = 0;

  setDifficult(difficult: Difficult) {
    this.difficult$.next(difficult);
    this.newStartingBoard();
  }

  getDifficult(): Observable<Difficult> {
    return this.difficult$.asObservable();
  }

  private getHolesCountByDifficult(difficult: Difficult) {
    switch(difficult) {
      case Difficult.Easy:
        return DifficultHoles.Easy;
      case Difficult.Medium:
        return DifficultHoles.Medium;
      case Difficult.Hard:
        return DifficultHoles.Hard;
      default:
        return DifficultHoles.Easy;
    }
  }

  private nextEmptySpot(board: TBoard): TEmptySpot {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) return [i, j];
      }
    }
    return [-1, -1];
  }

  private checkRow(board: TBoard, row: number, value: number): boolean {
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value) {
        return false;
      }
    }
  
    return true;
  };

  private checkColumn(board: TBoard, column: number, value: number): boolean {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === value) {
        return false;
      }
    }
  
    return true;
  };

  private checkSquare(
    board: TBoard,
    row: number,
    column: number,
    value: number
  ): boolean {
    const boxRow: number = Math.floor(row / 3) * 3;
    const boxCol: number = Math.floor(column / 3) * 3;
  
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === value) return false;
      }
    }
  
    return true;
  };

  checkValue(
    board: TBoard,
    row: number,
    column: number,
    value: number
  ): boolean {
    if (
      this.checkRow(board, row, value) &&
      this.checkColumn(board, column, value) &&
      this.checkSquare(board, row, column, value)
    ) {
      return true;
    }
  
    return false;
  };

  checkWin(board: TBoard): boolean {
    const [row, col] = this.nextEmptySpot(board);
    if (row === -1 && col === -1) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (!this.checkValue(board, i, j, board[i][j])) return false;
        }
      }
      return true;
    }
  
    return false;
  };

  private shuffle() {
    const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for ( let i = numArray.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ numArray[ i ], numArray[ j ] ] = [ numArray[ j ], numArray[ i ] ];
    }
    return numArray;
  }
  

  private solveSudoku(board: TBoard): TBoard {
    let [row, col] = this.nextEmptySpot(board);

    if (row === -1 && col === -1) {
      // board is full, return the solution
      return board;
    }
  
    for (let num of this.shuffle()) {
      if (this.checkValue(board, row, col, num)) {
        board[row][col] = num;
        this.solveSudoku(board);
      }
    }

    [row, col] = this.nextEmptySpot(board);

    if (row !== -1) board[row][col] = 0;

    return board;
  };

  private newBoard() { // Create an unaffiliated clone of a fresh board
    let board = this.solveSudoku(BLANK_BOARD?.map(row => row?.slice()));
    const [row, col] = this.nextEmptySpot(board);

    while (row !== -1 && col !== -1) {
      this.newBoard();
    }

    return board; // Populate the board using backtracking algorithm
  }
  
  private pokeHoles(board: TBoard): TBoard {
    const removedVals = []
    const holesCount = this.getHolesCountByDifficult(this.difficult$.value)

    while (removedVals.length < holesCount) {
      const val = Math.floor(Math.random() * 81) // Value between 0-81
      const randomRowIndex = Math.floor(val / 9) // Integer 0-8 for row index
      const randomColIndex = val % 9 

      if (!board[ randomRowIndex ]) continue // guard against cloning error
      if ( board[ randomRowIndex ][ randomColIndex ] == 0 ) continue // If cell already empty, restart loop
      
      removedVals.push({  // Store the current value at the coordinates
        rowIndex: randomRowIndex, 
        colIndex: randomColIndex, 
        val: board[ randomRowIndex ][ randomColIndex ] 
      })
      board[ randomRowIndex ][ randomColIndex ] = 0 // "poke a hole" in the board at the coords
      const proposedBoard = board.map(row => row.slice()) // Clone this changed board
      
      // Attempt to solve the board after removing value. If it cannot be solved, restore the old value.
      // and remove that option from the list
      // if (!this.solveSudoku(proposedBoard)) {  
      //   board[ randomRowIndex ][ randomColIndex ] = removedVals.pop().val 
      // }
    }
    return board
  }

  newStartingBoard(): Observable<TBoard> {
    // Reset global iteration counter to 0 and Try to generate a new game. 
    // If counter reaches its maximum limit in the fillPuzzle function, current attemp will abort
    // To prevent the abort from crashing the script, the error is caught and used to re-run
    // this function
    try {
      //counter = 0
      let solvedBoard = this.newBoard();
      // let [row, col] = this.nextEmptySpot(solvedBoard);

      // if (row !== -1 && col !== -1) {
      //   // board is full, return the solution
      //   throw new Error('Sudoku board generating');
      // }
      console.table(solvedBoard)
      // Clone the populated board and poke holes in it. 
      // Stored the removed values for clues
      const startingBoard = this.pokeHoles(solvedBoard.map(row => row.slice()))
      this.board$.next(startingBoard);
      return this.board$.asObservable();
      
    } catch (error) {
      return this.newStartingBoard();
    }
  }
}