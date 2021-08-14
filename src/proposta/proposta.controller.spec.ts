import { Test, TestingModule } from '@nestjs/testing';
import { PropostaController } from './proposta.controller';
import { PropostaService } from './proposta.service';

describe('PropostaController', () => {
  let controller: PropostaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropostaController],
      providers: [PropostaService],
    }).compile();

    controller = module.get<PropostaController>(PropostaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
