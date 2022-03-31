import { QueryResult } from "pg";
import { pool } from "../db/connection";

export const querySaveCNABInformation = async (
    registryType: string,
    creditDate: string,
    value: string,
    CPF: string,
    card: string,
    time: string,
    storeOwner: string,
    storeName: string
) => {
    const query = {
        text: `
                INSERT INTO cnab_information (
                    registryType,
                    creditDate,
                    value,
                    CPF,
                    card,
                    time,
                    storeOwner,
                    storeName
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
        `,
        values: [
            registryType,
            creditDate,
            value,
            CPF,
            card,
            time,
            storeOwner,
            storeName
        ],
    };

    try {
        const response = await pool.query(query);

        return response.rows
    } catch (err) {
        return err;
    }
};
