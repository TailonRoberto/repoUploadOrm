import { Router } from 'express';
import {getCustomRepository, Transaction } from 'typeorm'
import AppError from '../errors/AppError';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

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
   const { id } = request.headers;
   
   const transations = getCustomRepository(TransactionsRepository);

   const transactionDel = transations.findOne('' + id);

   if(!transactionDel){
     throw new AppError('this transaction not exists', 400);
   }

   //await transations.delete(transactionDel);

   response.send();



});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
