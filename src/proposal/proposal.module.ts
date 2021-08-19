import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from './entities/proposal.entity';
import { Loads } from './entities/loads.entity';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from 'src/auth/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Proposal, Loads]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule { }
