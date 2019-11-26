import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    cosnt file = await File.create({
      name,
      path
    })
  }
}

export default new FileController();
