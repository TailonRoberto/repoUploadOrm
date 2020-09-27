 import AppError from '../errors/AppError';
 import { getCustomRepository, getRepository } from 'typeorm';
 import TransactionRepository from '../repositories/TransactionsRepository';
 import TransactionCategory from '../repositories/categoryRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface TransactionDTO{
 
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;


}

class CreateTransactionService {
  public async execute({ title, type, value, category }: TransactionDTO): Promise<Transaction> {
    
    const transactionsRepo = getCustomRepository(TransactionRepository);  
    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepo.getBalance();

    if (type === 'outcome' && total < value ){
        throw new AppError('this value incorrect', 400);
    }


    let transactionCategory = await categoryRepository.findOne({
        where: {
          title: category,
        }
    });

    if (!transactionCategory){
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory);
    }

  

    const transaction = transactionsRepo.create({
      title,
      type,
      value,
      category:  transactionCategory,
     
    });

    await transactionsRepo.save(transaction);

    return transaction;

  }
}

export default CreateTransactionService;
