import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule, // AuthModule 에서 export 하는 것을 BoardModule 에서 사용 가능하게 됨.
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
