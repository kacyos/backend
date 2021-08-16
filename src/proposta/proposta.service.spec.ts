import { Test, TestingModule } from '@nestjs/testing';
import { PropostaService } from './proposta.service';

describe('PropostaService', () => {
  let service: PropostaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropostaService],
    }).compile();

    service = module.get<PropostaService>(PropostaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
