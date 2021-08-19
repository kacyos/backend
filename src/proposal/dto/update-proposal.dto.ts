import { PartialType } from '@nestjs/mapped-types';
import { CreateProposalDto } from './create-proposal.dto';

export class UpdatePropostaDto extends PartialType(CreateProposalDto) {}
