import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, readdir, readdirSync } from 'fs';
import { join } from 'path';
import { bindNodeCallback, map } from 'rxjs';
import * as Svgicons2svgfont from 'svgicons2svgfont';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllSvgUrls() {
    return bindNodeCallback(readdir)(join(__dirname, '..', 'client', 'svg'), {
      withFileTypes: true,
    }).pipe(map((res) => res.map((item) => `/svg/${item.name}`)));
  }

  generateFontBySvg() {
    const fontStream = new Svgicons2svgfont({
      fontName: 'iconfont',
    });
    fontStream.pipe(
      createWriteStream(
        join(__dirname, '..', 'client', 'font', 'iconfont.woff'),
      ),
      { end: true },
    );
    const content = readdirSync(join(__dirname, '..', 'client', 'svg'));
    if (!content || !content.length) return 'fail';
    content.forEach((item) => {
      const glyph = createReadStream(
        join(__dirname, '..', 'client', 'svg', item),
      );
      (glyph as any).metadata = {
        unicode: ['\uE001\uE002'],
        name: item.split('.')[0],
      };
      fontStream.write(glyph);
    });
    fontStream.end();
    return { url: '/font/iconfont.woff' };
  }
}
