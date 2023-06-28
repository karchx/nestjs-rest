import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { TaskEntity } from "../entities/task.entity";
import { config } from "dotenv";

config();

export class ConfigService {
  private static entities: Function[];

  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  static setEntities(entities: Function[]) {
    this.entities = entities;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "DEV";
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DATABASE"),
      synchronize: true,

      entities: ConfigService.entities,
      ssl: this.isProduction()
    };
  }
}

ConfigService.setEntities([UserEntity, TaskEntity]);
const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE"
]);

export { configService };