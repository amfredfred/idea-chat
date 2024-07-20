import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Token, TokenUriMetadata } from 'dto/token.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('token/upload')
  createUser(@Body() body: Token): Promise<object> {
    return this.appService.createToken(body);
  }
  @Post('file/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToIPFS(
    @Body() body: TokenUriMetadata,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.appService.handleTokenUris(file, file.originalname, body);
  }
  @Get('token/fetch')
  async fetchAllTokens(): Promise<any> {
    const tokens = await this.appService.fetchAllTokens();
    return tokens;
  }
  @Get('token/fetch/:id')
  async fetchToken(@Param('id') id: string): Promise<any> {
    const token = await this.appService.fetchToken(id);
    return token;
  }
}
