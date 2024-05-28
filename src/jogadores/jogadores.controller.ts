import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'
import { JogadoresValicacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';


@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(
        @Body() criaJogadorDto: CreatePlayerDTO) {
        await this.jogadoresService.criarAtualizarJogador(criaJogadorDto)
             
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string): Promise<Jogador[] | Jogador> {
            if (email) {
                return await this.jogadoresService.consultarJogadorPeloEmail(email);
            } else {
                return await this.jogadoresService.consultarTodosJogadores();
            }
        
    }

    @Delete()
    async deletarJogador(
        @Query('email',JogadoresValicacaoParametrosPipe) email: string): Promise<void> {
            await this.jogadoresService.deletarJogador(email)
        }

}
