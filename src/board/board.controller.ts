import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dtos/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoard();
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(@Param('id') id: string, @Body('status') status: BoardStatus): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
