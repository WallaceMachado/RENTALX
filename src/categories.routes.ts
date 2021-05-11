import { Router } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { Category } from './model/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];

//path inicial da rota está no server
categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  //new para que o contrutor seja chamado
  const category = new Category();

  //object.assing adiciona no objeto category, os parametros passados
  Object.assign(category, {
    name,
    description,
    created_at: new Date()
  });

  categories.push(category);


  return response.status(201).json({ category });
});

export { categoriesRoutes };