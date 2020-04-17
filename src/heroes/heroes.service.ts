import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HeroDto } from "./hero.dto";

@Injectable()
export class HeroesService {
constructor(
    @InjectModel('Heroes') private readonly heroModel: Model<any>)
{}
    public async createHero( name : string): Promise<HeroDto> {
            const createHero = new this.heroModel(name)
            return createHero.save();
    }
    public async findHeroes(): Promise<any>{
        return this.heroModel
                .find()
                .lean()
                .exec();
    }
    public async findHeroesByName( param: any ): Promise<any>{
        const{ name } = param
        console.log(param)
        return this.heroModel.find(  { name:{ $regex:name}});
    }
    public async findHeroById(_id){
        return  this.heroModel.findById({_id});
    }
    public async updateHero (hero, _id){
        const { name } = hero
        console.log('hero service name', name)
       return this.heroModel.update({_id}, {name});
    }
    public async delete ( _id: string ) {
       return  this.heroModel.findByIdAndDelete(_id)
    }
}