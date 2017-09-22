import { Component } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tic-Tac-Toe';
  player = 'X';
  opponent = 'O';
  gameOver = false;
  message = '';


  game = new Game(this.player, this.opponent);

  play(row: number, col: number) {

    if (!this.gameOver) {

      this.game.board[row][col] = this.game.human;

      if (this.gameOver = this.game.isGameWon(this.player)) {
        this.message = 'Player ' + this.player + ' wins!';
      } else if (this.gameOver = !this.game.isMoveAvailable()) {
        this.message = 'The game is a draw.';
      } else {
        this.game.compMove();
        if (this.gameOver = this.game.isGameWon(this.opponent)) {
          this.message = 'Player ' + this.opponent + ' wins.';
        }
      }

    }

  }

  reset() {
    this.game = new Game(this.player, this.opponent);
    this.gameOver = false;
  }

}
