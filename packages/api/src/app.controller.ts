import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'client', 'svg'),
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload')
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/svg',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    return {
      file: `/svg/${file.filename}`,
    };
  }

  @Get('allSvgs')
  getAllSvgs() {
    return this.appService.getAllSvgUrls();
  }

  @Get('generateFont')
  generateFont() {
    return this.appService.generateFontBySvg();
  }
}
