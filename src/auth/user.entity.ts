import { Board } from 'src/board/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // eager: true 는 User 를 가져 올 때 게시물도 가져온다.
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
