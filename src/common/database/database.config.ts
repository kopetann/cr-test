import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';

export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>(
        'POSTGRES_HOST',
        ' cr-test-database-1',
      ),
      port: this.configService.get<number>('POSTGRES_PORT', 5342),
      username: this.configService.get<string>(
        'POSTGRES_USER',
        ' cr-test-database-1',
      ),
      password: this.configService.get<string>(
        'POSTGRES_PASSWORD',
        ' cr-test-database-1',
      ),
      database: this.configService.get<string>(
        'POSTGRES_DB_NAME',
        ' cr-test-database-1',
      ),
      entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
      migrations: [
        join(__dirname, '..', '..', 'migrations', '**', '*.{ts,js}'),
      ],
      synchronize: true,
      logging: true,
    };
  }
}
