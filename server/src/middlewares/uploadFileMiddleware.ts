import { Request } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

enum Path {
  devices = 'devices',
  avatars = 'avatars',
}

const generateStorage = (path: Path) =>
  multer.diskStorage({
    // расположение
    destination(req, file, cb) {
      cb(null, `uploads/${path}/`);
    },
    // правило наименования
    filename(req, file, cb) {
      cb(null, uuidv4() + '.' + file.originalname.split('.').slice(-1));
    },
  });

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadDeviceImage = multer({
  storage: generateStorage(Path.devices),
  fileFilter,
});
export const uploadAvatar = multer({
  storage: generateStorage(Path.avatars),
  fileFilter,
});
