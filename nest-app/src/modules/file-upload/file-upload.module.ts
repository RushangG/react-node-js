import { BadRequestException, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;

          if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
            throw new BadRequestException(
              'Only image and PDF files are allowed!',
            );
          }

          if (file.size > 5 * 1024 * 1024) {
            // 5MB limit
            throw new BadRequestException(
              'File size exceeds the limit of 5MB!',
            );
          }
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
