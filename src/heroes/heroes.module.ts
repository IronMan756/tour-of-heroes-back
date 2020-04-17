import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { heroShema } from './hero.shema';

@Module({
    controllers:[HeroesController],
    exports:[HeroesService],
    imports: [
        MongooseModule.forFeature([{ name: 'Heroes', schema: heroShema}]),
    ],
    providers: [HeroesService]
})
export class HeroesModule {}
