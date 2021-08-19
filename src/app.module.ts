import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProposalModule } from './proposal/proposal.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, ProposalModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
