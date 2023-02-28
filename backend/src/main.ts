import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import * as serviceAccount from '../serviceAccountKey.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.BUCKET_URL,
});

export const bucket = getStorage().bucket();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://music-player-frontend.onrender.com',
    ],
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
