import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class JogadoresService {

    private players: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {

        const { email } = createPlayerDTO
        const playerMatch = await this.players.find(jogador => playerMatch.email === email)

        if (playerMatch) {
            return this.update(playerMatch, createPlayerDTO);
        } else {
            this.create(createPlayerDTO);
        }
    }

    async findByEmail(email: string): Promise<Jogador> {
        const playerMatch = await this.players.find(jogador => jogador.email === email)
        if (!playerMatch) {
            throw new NotFoundException(`Player with ${email} not found!`)
        }
        return playerMatch;
    }

    async findAll(): Promise<Jogador[]> {
        return await this.players;
    }

    private create(createPlayerDTO: CreatePlayerDTO): void {
        const { name, phoneNumber, email } = createPlayerDTO

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

    private update(playerMatch: Jogador, createPlayerDTO: CreatePlayerDTO): void {
        const { name } = createPlayerDTO

        playerMatch.name = name;

    }

    async delete(email): Promise<void> {
        const playerMatch = await this.players.find(jogador => jogador.email === email)
        this.players = this.players.filter(jogador => jogador.email !== playerMatch.email)
    }

}
