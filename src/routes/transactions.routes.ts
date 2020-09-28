import { Router } from 'express';
import multer from 'multer'
import {getCustomRepository, Transaction } from 'typeorm'

import AppError from '../errors/AppError';


import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);


 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
 import DeleteTransactionService from '../services/DeleteTransactionService';
 import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

interface ResquestDTO{
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();
  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  
  const { title, type, value, category }: ResquestDTO  =  request.body;

  const TransactionServices = new CreateTransactionService()
  
  const transaction = await  TransactionServices.execute( {title, type, value, category }  );

  return response.json(transaction);

});

transactionsRouter.delete('/:id', async (request, response) => {
   const { id } = request.params;
   
   const transactionDelete = new DeleteTransactionService();

   await transactionDelete.execute(id);
 
   response.status(204).send();

});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const importTransactions = new ImportTransactionsService();

  const transations = await importTransactions.execute(request.file.path);

  return response.json (transations);


});

export default transactionsRouter;
