import pg from 'pg';
import { DB_CONFIG_OPTIONS } from './constants';

export class Pool {
  _pool: pg.Pool | null = null;

  async connect(options: any): Promise<any> {
    this._pool = new pg.Pool(options);
    return this._pool.query('SELECT 1 + 1;')
  }

  close(): void {
    this._pool?.end();
  }

  async query(sql: string, params: Array<string | number>): Promise<any> {
    return this._pool!.query(sql, params);
  }

  async testPrimaryDBConection(): Promise<void> {
    this.connect(DB_CONFIG_OPTIONS).then(() => {
      console.log('Connected to the database');
    }).catch((err) => {
      console.log('Cannot connect to the database', err);
    });
  }
}