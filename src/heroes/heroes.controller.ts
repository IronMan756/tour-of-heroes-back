import { HeroDto } from './hero.dto';
import { HeroesService } from './heroes.service';
import { Controller, Post, HttpStatus, Body, Res, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';





@Controller('heroes')
export class HeroesController {

constructor( 
    private readonly heroService: HeroesService,
){}

    @Post()
    @ApiOperation({ description: 'Create new hero' })
    @ApiResponse({
      description: 'Create new hero success',
      status: HttpStatus.OK
    })
    @ApiResponse({
      description: 'Wrong credentials',
      status: HttpStatus.UNAUTHORIZED
    })
    @ApiResponse({
      description: 'Server error',
      status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    public async createHero(
      @Body() name: string,
      @Res() res: Response
    ) {
      try {
        const newHero = await this.heroService.createHero(name) 
        return res.status(HttpStatus.OK).json({
            data: newHero,
            error: null,
          });;
      } catch (error) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ data: null, error });
      }
    }
    @Get()
    @ApiOperation({ description: 'Find heroes' })
    @ApiResponse({
      description: 'Find heroes success',
      status: HttpStatus.OK,
    })
    @ApiResponse({
      description: 'Server error find heroes',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    })

    public async findHeroes(
      @Res() res: Response
    ) {
      try {
          const heroes = await this.heroService.findHeroes();
          const amount = heroes.length;
         
        return res.status(HttpStatus.OK).json({ data: heroes,amount: amount ,error: null });
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ data: null, error });
      }
    }
    @Get('/search')
    @ApiOperation({ description: 'Search hero by name' })
    @ApiResponse({
      description: 'Search hero by name success',
      status: HttpStatus.OK,
    })
    @ApiResponse({
      description: 'Server error search hero by name',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    public async searchByName(

      @Query() param: string,
      @Res() res: Response
    ) {
      try {
        const hero = await this.heroService.findHeroesByName(param);
        return res.status(HttpStatus.OK).json({ data: hero, error: null });
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ data: null, error });
      }
    }
    @Get('/:id')
    @ApiOperation({ description: 'Find hero' })
    @ApiResponse({
      description: 'Find hero success',
      status: HttpStatus.OK,
    })
    @ApiResponse({
      description: 'Server error find hero',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    })

    public async findHeroById(
    
      @Param('id') param: string,
      @Res() res: Response
    ) {
      try {
        const hero = await this.heroService.findHeroById(param);
        return res.status(HttpStatus.OK).json({ data: hero, error: null }) ;
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ data: null, error });
      }
    }

    @Put()
    @ApiOperation({ description: 'Updute hero' })
    @ApiResponse({
        description: ' Update hero success',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Server error update hero',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })

    public async update(
        @Body() hero: HeroDto,
        @Res() res: Response
    ) {
        try {
          const updatedHero = await this.heroService.updateHero(hero, hero._id);
          return  res.status(HttpStatus.OK).json({ data: updatedHero, error: null });
        } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ data: null, error });
        }
    }
    @Delete(':id')
    @ApiOperation({ description: 'Delete hero' })
    @ApiResponse({
        description: 'Delete hero success',
        status: HttpStatus.OK,
    })
    @ApiResponse({
        description: 'Server error delete hero',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })

    public async deleteHero(
        @Param('id') _id: string,
        @Res() res: Response
    ) {
        try {
         const deletedHero = await this.heroService.delete(_id);
    
        return  res.status(HttpStatus.OK).json({ data: deletedHero, error: null });
        } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ data: null, error });
        }
    }
}
