import {Pool} from 'pg';

const config = {
    connectionString: 'postgres://postgres:12345@cnab-db:5432/cnab-db'
};

export const pool: any = new Pool(config);
