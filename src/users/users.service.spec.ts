import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = new UserEntity('Test', 'test@gmail.com', expect.anything());
  const mockUserLogin = {
    user: {
      name: 'Test',
      email: 'test@gmail.com',
      password: expect.anything(),
      id: 1,
      created_at: new Date(),
    },
    token: expect.anything(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),

          useValue: {
            save: jest.fn().mockReturnValue(mockUser),
            findOne: jest.fn().mockReturnValue(mockUserLogin),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create user', () => {
    expect(
      service.create({
        name: 'Test',
        email: 'test@gmail.com',
        password: '12345678',
      }),
    ).resolves.toEqual(mockUser);
  });
});
