import { Move } from './move';

export class Game {
  private _board: Array<Array<string>>;

  constructor(readonly human: string, readonly computer: string) {
    this._board = [];

    for (let row = 0; row < 3; row++) {
      this._board[row] = [];
      for (let col = 0; col < 3; col++) {
        this._board[row][col] = ' ';
      }
    }
  }

  public get board() {
    return this._board;
  }

  public isMoveAvailable(): boolean {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.board[r][c] === ' ') {
          return true;
        }
      }
    }
    return false;
  }

  public isGameWon(player: string): boolean {

    for (let i = 0; i < 3; i++) {

      // check each row
      if (this._board[i][0] === this._board[i][1]
          && this._board[i][1] === this._board[i][2]){

            if (this._board[i][0] === player) { return true; }

      }

      // check each column
      if (this._board[0][i] === this._board[1][i]
          && this._board[1][i] === this._board[2][i]) {

            if (this._board[0][i] === player) { return true; }
      }
    }

    // Check diagonally for win
    if (this.board[0][0] === this.board[1][1]
            && this.board[1][1] === this.board[2][2]) {
      if (this.board[0][0] === player) { return true; }
    }

    if (this.board[0][2] === this.board[1][1]
            && this.board[1][1] === this.board[2][0]) {
      if (this.board[0][2] === player) { return true; }
    }

    // Player did not win =^(
    return false;
  }

  // Check for a terminal state of the board
  isGameOver(): boolean {

    if (!this.isMoveAvailable()) {
      return true;
    }
    if (this.isGameWon(this.computer)
                || this.isGameWon(this.human)) {
        return true;
    }

    return false;
  }

  score(depth: number): number {
    if (this.isGameWon(this.computer)) {
      return 10 - depth;
    }else if (this.isGameWon(this.human)) {
      return depth - 10;
    }
    return 0;
  }

  min(board: Array<Array<string>>, depth: number): number {
    if (this.isGameOver()) {
      return this.score(depth);
    }

    let score = Number.MAX_SAFE_INTEGER;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.board[r][c] === ' ') {
          board[r][c] = this.human;
          const tempScore = this.max(board, depth + 1);

          score = Math.min(score, tempScore);

          board[r][c] = ' ';
        }
      }
    }
    return score;
  }

  max(board: Array<Array<string>>, depth: number): number {

    if (this.isGameOver()) {
      return this.score(depth);
    }

    let score = Number.MIN_SAFE_INTEGER;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.board[r][c] === ' ') {

          board[r][c] = this.human;
          const tempScore = this.min(board, depth + 1);

          score = Math.min(score, tempScore);

          board[r][c] = ' ';
        }
      }
    }

    return 0;
  }

  minimax(): Move {

    let best: Move = new Move(-1, -1);

    let bestScore = Number.MIN_SAFE_INTEGER;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === ' ') {
          this.board[row][col] = this.computer;

          const tempScore = this.min(this.board, 0);

          this.board[row][col] = ' ';

          if (tempScore > bestScore) {
            bestScore = tempScore;
            best.row = row;
            best.col = col;
          }
        }
      }
    }

    return best;

  }

  compMove() {
    const compMove: Move = this.minimax();

    this.board[compMove.row][compMove.col] = this.computer;
  }
}
