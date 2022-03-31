import { buildBalanceInformation, buildTransactionsInformation, getStoresName, getUniqueStores, isToSum } from '../../server/helpers/cnab';
import readCNABData from '../../server/utils/readCNAB';
import { ICNABInformation, ITransaction } from "../../interfaces/interfaces";
import { CNBARawDataMocked, CNABInformationMocked} from './mockedData';
import { pool } from '../../server/db/connection';
import { querySaveCNABInformation } from '../../server/model/cnab';

    describe('readCNAB function', () => {
        it('test readCNABData function: sending CNBAB raw data, should return expected object result', async () => {
            const parse: string[] = CNBARawDataMocked.split(/\r?\n/);
            const result: ICNABInformation[] | string  = readCNABData(parse)
            expect(result.length).not.toBe(0);
            expect(result[0]).toHaveProperty("registryType");
            expect(result[0]).toHaveProperty("creditDate");
            expect(result[0]).toHaveProperty("value");
            expect(result[0]).toHaveProperty("CPF");
            expect(result[0]).toHaveProperty("card");
            expect(result[0]).toHaveProperty("time");
            expect(result[0]).toHaveProperty("storeOwner");
            expect(result[0]).toHaveProperty("storeName");
        });

        it('test readCNABData function: sending CNBAB raw data, should return right type of data in the object result', async () => {
            const parse: string[] = CNBARawDataMocked.split(/\r?\n/);
            const result: ICNABInformation[] | string  = readCNABData(parse)
            expect(result.length).not.toBe(0);
            expect(typeof result[0].registryType).toBe("string")
            expect(typeof result[0].creditDate).toBe("string")
            expect(typeof result[0].value).toBe("string")
            expect(typeof result[0].CPF).toBe("string")
            expect(typeof result[0].card).toBe("string")
            expect(typeof result[0].time).toBe("string")
            expect(typeof result[0].storeOwner).toBe("string")
            expect(typeof result[0].storeName).toBe("string")
        });

        it('test readCNABData function: not sending CNBAB raw data, should return empty array ', async () => {
            const parse: string[] = `NOTVALIDCNAB00000000000000000000000 
            NOTVALIDCNAB00000000000000000000000`.split(/\r?\n/);
            const result: ICNABInformation[] | string = readCNABData(parse)
            expect(result.length).toBe(0);
        });
    });


    describe('saveCNABInformation controller', () => {
        describe('isToSum function', () => {
            it('test isToSum function: sending "+" value, should return true', async () => {
                const result: boolean = isToSum('+')
                 expect(result).toBe(true);
             });
     
             it('test isToSum function: sending "-" value, should return false', async () => {
                 const result: boolean  = isToSum('-')
                  expect(result).toBe(false);
              });
     
              it('test isToSum function: sending "*" value, should return false', async () => {
                 const result: boolean = isToSum('*')
                  expect(result).toBe(false);
              });
        })

        describe('getStoreNames function', () => {
            it('test getStoreNames function: passing cnab information should return array of stores name', async () => {
                const result: string[] = getStoresName(CNABInformationMocked)
                 expect(result.length).toBe(3);
             });
    
             it('test getStoreNames function: passing empty array should return nothing', async () => {
                const result: string[] = getStoresName([])
                 expect(result.length).toBe(0);
             });
        })


        describe('getUniqueStores function', () => {
            it('test getUniqueStores function: passing duplicate store name should return unique store name', async () => {
                const storeNames: string[] = ['BAR DO JOÃO       ', 'MERCADO DA AVENIDA', 'BAR DO JOÃO       ' ]
                const expectedResult: string[] = ['BAR DO JOÃO       ', 'MERCADO DA AVENIDA']
                const result: string[] = getUniqueStores(storeNames)
                expect(result.length).toBe(2);
                expect(result).toStrictEqual(expectedResult);
             });
        })
  

        describe('buildTransactionsInformation function', () => {
            it('test buildTransactionsInformation function: passing store information should return transaction data', async () => {
                const result: ITransaction[] = buildTransactionsInformation(CNABInformationMocked)
                expect(result.length).toBe(3);
                expect(result[0]).toHaveProperty("transactionDate");
                expect(result[0]).toHaveProperty("transactionType");
                expect(result[0]).toHaveProperty("transactionValue");
             });
    
             it('test buildTransactionsInformation function: passing empty array should return empty transaction data', async () => {
                const result: ITransaction[] = buildTransactionsInformation([])
                expect(result.length).toBe(0);
                expect(result[0]).toBe(undefined);
    
             });    
        })
  

        describe('buildBalanceInformation function', () => {
            it('test buildBalanceInformation function: passing store information should return balance data', async () => {
                const result: number = buildBalanceInformation(CNABInformationMocked)
                expect(result).toBe(-10.7);
             });
    
             it('test buildBalanceInformation function: passing empty array should return empty balance data', async () => {
                const result: number = buildBalanceInformation([])
                expect(result).toBe(0);
             });
        })    
    });


    describe('saveCNABInformation model', () => {
        describe('querySaveCNABInformation function', () => {
            it('garantee correct query', async () => {
                const spy = jest.spyOn(pool, 'query');
                const mockedData = {
                    registryType: '',
                    creditDate: '',
                    value: '',
                    CPF: '',
                    card: '',
                    time: '',
                    storeOwner: '',
                    storeName: '',
                };

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
                        mockedData.registryType,
                        mockedData.creditDate,
                        mockedData.value,
                        mockedData.CPF,
                        mockedData.card,
                        mockedData.time,
                        mockedData.storeOwner,
                        mockedData.storeName
                    ],
                }
    
                await querySaveCNABInformation(  
                    mockedData.registryType,
                    mockedData.creditDate,
                    mockedData.value,
                    mockedData.CPF,
                    mockedData.card,
                    mockedData.time,
                    mockedData.storeOwner,
                    mockedData.storeName
                );

                expect(spy).toBeCalledWith(query);
             });
        })
    });