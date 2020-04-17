import { ApiProperty } from "@nestjs/swagger";


export class HeroDto {
    @ApiProperty()
    public readonly name!: string
    
    public readonly _id?: string

}