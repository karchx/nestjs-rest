import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./config/config.service"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
