import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Brunolira1:Brunolira1@cluster0.ia0f8zq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
