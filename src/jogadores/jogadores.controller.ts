import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDTO: CreatePlayerDTO) {
        await this.jogadoresService.createUpdatePlayer(createPlayerDTO);
    }
}
