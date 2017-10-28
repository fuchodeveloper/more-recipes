import express from 'express';
import multer from 'multer';


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
      console.log(err);
    } else {
      res.send(req.file);
      console.log(req.body);
      console.log('works');
    }
  });
});

export default router;
