// import AppError from '../errors/AppError';
import { getCustomRepository, Transaction } from 'typeorm';
import transactionRepository from '../repositories/TransactionsRepository'

class DeleteTransactionService {
  public async execute(id: 'uuid'): Promise<void> {
    
    const transaction = getCustomRepository(transactionRepository);

    const transactionDelete = await transaction.findOne(id);

    // await transaction.remove();




  }
}

export default DeleteTransactionService;
