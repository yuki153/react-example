import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Functional Component は引数として props を渡される
 * function でも arrow 関数でも定義可能
 * @param {Object} props
 */
const Square = props => {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // ▼ [X] Object の shallow copy（浅いコピー）のため、key に対する Array の値はコピー元を参照してしまう
    // const { squares }  = { ...history[this.state.stepNumber] }
    // ▼ [O] Array 自体を shallow copy する必要がある
    const squares = [ ...history[this.state.stepNumber].squares ]
    if (squares[i] || calculateWinner(squares)) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // history: history.push({ squares }), push は配列数を返すため NG
      history: [...history, { squares }],
      xIsNext: ((this.state.stepNumber + 1) % 2) === 0,
      stepNumber: this.state.stepNumber + 1,
    });
  }

  jumpTo(i) {
    this.setState({
      xIsNext: (i % 2) === 0,
      stepNumber: i,
    });
  }

  render() {
    const curSquares = this.state.history[this.state.stepNumber].squares;
    const winner = calculateWinner(curSquares);
    let status;

    const moves = this.state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            // onClick={this.handleClick} 呼び出し先で this の値が変わるため Arrow 関数で wrap が必要
            onClick={(i) => this.handleClick(i)}
            squares={curSquares}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          {/* Vue と異なり配列の jsx を渡すだけで展開してくれる */}
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
