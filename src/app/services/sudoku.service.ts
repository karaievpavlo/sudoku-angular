import { Injectable } from "@angular/core";
import { TBoard } from "../common/types/board.type";
import { TEmptySpot } from "../common/types/empty-spot.type";
import { BLANK_BOARD } from "../common/objects/blank-board.object";
import { Difficult } from "../common/enums/difficult.enum";
import { BehaviorSubject, Observable } from "rxjs";
import { DifficultHoles } from "../common/enums/difficult-holes.enum";
import { LoaderService } from "./loader.service";

@Injectable()
export class SudokuService {
  private readonly difficult$ = new BehaviorSubject<Difficult>(Difficult.Easy);
  private readonly board$ = new BehaviorSubject<TBoard>(BLANK_BOARD);

  constructor(
    private readonly loaderService: LoaderService
  ) {

  }

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

  isBoardValid(board: TBoard): boolean {

    for (let row = 0; row < 9; row++) {
      if (!this.isUniqueArray(board[row])) {
        return false;
      }
    }

    for (let col = 0; col < 9; col++) {
      const column = board.map(row => row[col]);
      if (!this.isUniqueArray(column)) {
        return false;
      }
    }

    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const box = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            box.push(board[row + r][col + c]);
          }
        }
        if (!this.isUniqueArray(box)) {
          return false;
        }
      }
    }

    return true;
  }

  private isUniqueArray(arr: number[]): boolean {
    const set = new Set(arr);
    return set.size === 9 && !set.has(0);
  }

  checkWin(board: TBoard): boolean {
    const [row, column] = this.nextEmptySpot(board);

    if (!row && !column) return false;

    return this.isBoardValid(board);
  }

  private shuffle() {
    const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for ( let i = numArray.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ numArray[ i ], numArray[ j ] ] = [ numArray[ j ], numArray[ i ] ];
    }
    return numArray;
  }
  

  private solveSudoku(board: TBoard): TBoard {
    let [row, col] = this.nextEmptySpot(board);

    if (row === -1 && col === -1) {
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

  private newBoard() {
    let board = this.solveSudoku(BLANK_BOARD?.map(row => row?.slice()));
    const [row, col] = this.nextEmptySpot(board);

    while (row !== -1 && col !== -1) {
      this.newBoard();
    }

    return board;
  }
  
  private pokeHoles(board: TBoard): TBoard {
    const removedVals = [];
    const holesCount = this.getHolesCountByDifficult(this.difficult$.value);

    while (removedVals.length < holesCount) {
      const val = Math.floor(Math.random() * 81);
      const randomRowIndex = Math.floor(val / 9);
      const randomColIndex = val % 9;

      if (!board[ randomRowIndex ]) continue;
      if ( board[ randomRowIndex ][ randomColIndex ] == 0 ) continue;
      
      removedVals.push({
        rowIndex: randomRowIndex, 
        colIndex: randomColIndex, 
        val: board[ randomRowIndex ][ randomColIndex ] 
      })
      board[ randomRowIndex ][ randomColIndex ] = 0;
    }
    return board;
  }

  newStartingBoard(): Observable<TBoard> {
    try {
      this.loaderService.isLoading$.next(true);
      let solvedBoard = this.newBoard();

      const startingBoard = this.pokeHoles(solvedBoard.map(row => row.slice()))
      this.board$.next(startingBoard);
      this.loaderService.isLoading$.next(false);
      return this.board$.asObservable();
      
    } catch (error) {
      return this.newStartingBoard();
    }
  }
}