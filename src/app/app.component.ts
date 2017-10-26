import { Component } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tic-Tac-Toe - Angular';
  player = 'X';
  opponent = 'O';
  isGameOver = false;
  message = '';


  game = new Game(this.player, this.opponent);

  computerFirst() {

    this.player = 'O';
    this.opponent = 'X';
    this.isGameOver = false;

    this.game = new Game(this.player, this.opponent);

    this.game.compMove();
  }

  play(row: number, col: number) {

    if (!this.isGameOver) {

      this.game.humanMove(row, col);

      if (this.isGameOver = this.game.isGameWon(this.player)) {
        this.message = 'Player ' + this.player + ' wins!';
      } else if (this.isGameOver = !this.game.isMoveAvailable()) {
        this.message = 'The game is a draw.';
      } else {
        this.game.compMove();

        if (this.isGameOver = !this.game.isMoveAvailable()) {
          this.message = 'The game is a draw.';
        } else if (this.isGameOver = this.game.isGameWon(this.opponent)) {
          this.message = 'Player ' + this.opponent + ' wins.';
        }
      }

    }

  }

  reset() {
    this.player = 'X';
    this.opponent = 'O';
    this.game = new Game(this.player, this.opponent);
    this.isGameOver = false;
  }

  checkGameOver(): boolean {
    return this.isGameOver;
  }

}
