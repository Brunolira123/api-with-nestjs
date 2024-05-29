import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { UpdatePlayerDTO } from './dtos/updatePlayer.dto';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) { }

  async atualizarJogador(_id: string, update: UpdatePlayerDTO): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador de id: ${_id} não encontrado`)
    }
    await this.jogadorModel.findByIdAndUpdate({ _id }, { set: update }).exec()
  }

  async criarJogador(criaJogadorDto: CreatePlayerDTO): Promise<Jogador> {
    const { email } = criaJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com o email: ${email} ja cadastrado!`)
    }
    const jogadorCriado = new this.jogadorModel(criaJogadorDto)
    return await jogadorCriado.save();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id): Promise<any> {
    this.validarJogador(_id);
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }

  private async validarJogador(_id) {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new BadRequestException(`Jogador com o id: ${_id} nao encontrado!`)
    }
  }

}
