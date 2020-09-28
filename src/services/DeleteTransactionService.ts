import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError'
import transactionRepository from '../repositories/TransactionsRepository'

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    
    const transaction = getCustomRepository(transactionRepository);

    const transactionDelete = await transaction.findOne(id);

    if(!transactionDelete){
      throw new AppError('Transaction does not exist', 400);
    }
 
     //await transaction.delete(transactionDelete);
     await transaction.remove(transactionDelete);
 




  }
}

export default DeleteTransactionService;
