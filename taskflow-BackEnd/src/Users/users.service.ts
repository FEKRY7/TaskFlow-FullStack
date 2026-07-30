import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthProvider } from './auth.provider';
import { Token } from 'src/Token/token.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authProvider: AuthProvider,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  /**
   * Creates a new user in the database.
   * @param registerDto The user's registration data.
   * @returns JWT (access token)
   */

  public async SignUp(registerDto: RegisterDto) {
    return await this.authProvider.SignUp(registerDto);
  }

  /**
   * Log In user
   * @param loginDto The user's login data.
   * @returns JWT (access token)
   */

  public async login(loginDto: LoginDto) {
    return await this.authProvider.login(loginDto);
  }

  /**
   *  Get user by id.
   * @param id id of the user.
   * @returns User.
   */
  public async getCurrentUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return user;
    }
  }

  public async getToken(
    token: string,
  ) {
    const tokenDb = await this.tokenRepository.findOneBy({
      token,
      isValied: true,
    });
    if (!tokenDb) {
      throw new NotFoundException('Expired or invalid token');
    }
  }
}
