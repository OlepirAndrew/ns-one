import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('nest lesson')
      .setDescription('nest psql sequelize pgAdmin swagger' )
      .setTitle('1.0.0')
      .addTag('everest')
      .build()

  const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('/api/docs', app, document);


  await app.listen(PORT, () => console.log(`START ${PORT}`));
}
bootstrap();
