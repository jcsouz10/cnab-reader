import { Request, Response } from "express";
import { QueryResult } from "pg";

import readCNABData from "../utils/readCNAB";
import { querySaveCNABInformation } from "../model/cnab";
import { ICNABInformation, IStoreInformation } from "../../interfaces/interfaces";
import { buildStoreInformation, getStoresName, getUniqueStores } from '../helpers/cnab';

export const saveCNABInformation = async (
    req: Request & { file: any },
    res: Response
) => {
    try {
        if (!req.file && !req.file.buffer) {
            res.status(400).send("Missing file...")
            return false;
        }

        const file: string[] = req.file.buffer.toString().split(/\r?\n/);

        const CNABInformations: ICNABInformation[] = readCNABData(file);
        
        if (CNABInformations.length === 0) {
            res.status(400).send('Error processing your file...');
            return false;
        }

        const saveCNABInformation: Promise<QueryResult>[] = CNABInformations.map((CNABInformation: ICNABInformation) => {
            return querySaveCNABInformation(
                CNABInformation.registryType,
                CNABInformation.creditDate,
                CNABInformation.value,
                CNABInformation.CPF,
                CNABInformation.card,
                CNABInformation.time,
                CNABInformation.storeOwner,
                CNABInformation.storeName)
        })

       const storesInformation =  await Promise.all(saveCNABInformation)
            .then(() => {
                const allStores: string[] = getStoresName(CNABInformations)
                const uniqueStores: string[] = getUniqueStores(allStores);
                const operationsPerStoreTotalized: IStoreInformation[] = buildStoreInformation(CNABInformations, uniqueStores);
                
                return operationsPerStoreTotalized;
            })
            .catch(err =>   {
                res.status(400).send('Error saving your file...');
                return;
            });
        
        res.status(200).send(storesInformation);
        return true;
    } catch (err) {
        res.status(400).send(err);
        return false;
    }
};


