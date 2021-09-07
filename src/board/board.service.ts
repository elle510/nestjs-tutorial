import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dtos/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoard(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardByMe(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();

    return boards;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board: Board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }
}
