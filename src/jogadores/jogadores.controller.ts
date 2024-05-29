import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'
import { JogadoresValicacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { UpdatePlayerDTO } from './dtos/updatePlayer.dto';


@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criaJogadorDto: CreatePlayerDTO): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criaJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() update: UpdatePlayerDTO,
        @Param('_id', JogadoresValicacaoParametrosPipe) _id: string): Promise<void> {
        await this.jogadoresService.atualizarJogador(_id, update)
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(
        @Param('_id', JogadoresValicacaoParametrosPipe) _id: string): Promise<Jogador> {
        return await this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', JogadoresValicacaoParametrosPipe) _id: string): Promise<void> {
        await this.jogadoresService.deletarJogador(_id);
    }

}

