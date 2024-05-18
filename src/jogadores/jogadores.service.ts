import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class JogadoresService {

    private players: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        this.create(createPlayerDTO);
    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const {name,phoneNumber, email}= createPlayerDTO

        const jogador: Jogador = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlFotoJogador: 'www.google.com.br/foto123.png'
        };
        this.logger.log(`createPlayerDTO: ${JSON.stringify(jogador)}`)
        this.players.push(jogador);
    }
}
