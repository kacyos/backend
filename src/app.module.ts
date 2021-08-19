import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProposalModule } from './proposal/proposal.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ProposalModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || "localhost",
      port: 5432,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "mysecretpassword",
      database: process.env.POSTGRES_DATABASE || "omega",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
