import { Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dtos/create-board.dto';

@Injectable()
export class BoardService {
  getAllBoard(): Board[] {
    const board = new Board();
    board.title = 'title';

    return [board];
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    // const board: Board = {
    //   id: 1,
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // };

    const board = new Board();
    board.id = 1;
    board.title = title;
    board.description = description;
    board.status = BoardStatus.PUBLIC;

    return board;
  }

  getBoardById(id: string): Board {
    const board = new Board();
    board.id = Number(id);
    board.title = 'title';

    return board;
  }

  deleteBoard(id: string): void {
    console.log('delete id', id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board: Board = this.getBoardById(id);
    board.status = status;

    return board;
  }
}
