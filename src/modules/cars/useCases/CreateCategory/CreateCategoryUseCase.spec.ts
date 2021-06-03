import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '../../../../errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {

    //essa function é chama antes do teste
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it('Should be able to create new category', async () => {
        const category = {
            name: 'SUV',
            description: 'Carros grandes',
        };

        await createCategoryUseCase.excute({name:'SUV', description: 'Carros grandes', })

        //como é uma function void, vamos usar o método findByName para verificar se a categoria foi criada
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );
          console.log(categoryCreated);
        // espera que categoryCreated tenha a propriedade "id".
        expect(categoryCreated).toHaveProperty('id');
    });

    it('Should not be able to create category with an existing name', async () => {
        expect(async () => {
            const category = {
                name: 'SUV',
                description: 'Carros grandes',
            };

            await createCategoryUseCase.excute({name:category.name, description: category.description});

            
            await createCategoryUseCase.excute({name:category.name, description: category.description});
        }).rejects.toBeInstanceOf(AppError);
    }); 
}); 

