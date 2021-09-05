import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = await this.create({ username, password });

    await this.save(user);
  }
}
