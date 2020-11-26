import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooService } from './foo/foo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FooService],
})
export class AppModule {}
