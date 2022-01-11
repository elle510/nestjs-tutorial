import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// console.log('process.env.DB_USERNAME', process.env.DB_HOST); // undefined
// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'test',
//   database: 'nestjs_tutorial',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };

// app.module.ts 에서 import 를 해서 이 파일을 먼저 읽기 때문에
// 위 처럼 객체를 넘기면 환경변수를 인식 못하므로 아래처럼 함수로 넘겨 app.module.ts 에서 호출하게 한다.
export const typeORMConfig = (): TypeOrmModuleOptions => {
  // console.log('process.env.DB_HOST', process.env.DB_HOST); // localhost (값이 정상적으로 들어있음)
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    // username: 'postgres',
    // password: 'test',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };
};
