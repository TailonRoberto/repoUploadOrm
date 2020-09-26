import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

class Transaction {
  id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;

  category_id: string;

  created_at: Date;

  updated_at: Date;
}

export default Transaction;
