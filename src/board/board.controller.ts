import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoard();
  }

  @Get('/me')
  getBoardByMe(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getBoardByMe(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
