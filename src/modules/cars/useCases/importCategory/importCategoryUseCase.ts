
import fs from 'fs';

import csvParse from 'csv-parse';


import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {

  constructor(private categoryRepository: ICategoriesRepository) { }


  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();
      //pipe le o arquivo e salva os pedaços e passa para o parseFile
      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;

        categories.push({
          name,
          description,
        });
      })
        .on("end", () => {
          fs.promises.unlink(file.path); // remove o arquivo temp criado
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });


    });

  }
  async excute(file: Express.Multer.File): Promise<void> {

    const categories = await this.loadCategories(file);
    categories.map(async(category) => {
      const { name, description } = category;

      const existsCategory = this.categoryRepository.findByName(name);

      if (!existsCategory) {
        this.categoryRepository.create({ name, description });
      }

    });

  }

}

export { ImportCategoryUseCase }