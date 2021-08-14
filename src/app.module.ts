import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropostaModule } from './proposta/proposta.module';

@Module({
  imports: [PropostaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
