import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDTO: CreatePlayerDTO) {
        await this.jogadoresService.createUpdatePlayer(createPlayerDTO);
    }

    @Get()
    async getPlayer(
        @Query('email') email: string): Promise<Jogador[] | Jogador> {
            if(email){
                return  await this.jogadoresService.findByEmail(email);
            }
        return await this.jogadoresService.findAll();
    }

    @Delete()
    async delete(@Query('email')email:string):Promise<void>{
        this.jogadoresService.delete(email)
    }
}
