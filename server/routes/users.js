import express from 'express';
import multer from 'multer';
import formidable from 'express-formidable'

const router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});
const upload = multer({ storage }).single('avatar');

router.post('/', (req, res) => {
  upload(req, res, function(err) {
    if (err){
      res.send(err);
    } else {
      res.send(req.file);
      console.log('works');
    }
  });
});

export default router;
