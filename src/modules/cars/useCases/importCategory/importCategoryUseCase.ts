
import fs from 'fs';

import csvParse from 'csv-parse';

class ImportCategoryUseCase {

  // constructor(private importCategoryController: ImportCategoryController){

  //}
  excute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();
    //pipe le o arquivo e salva os pedaços e passa para o parseFile
    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });

  }

}

export { ImportCategoryUseCase }