export interface ICNABInformation {
    registryType: string,
    creditDate: string,
    value: string,
    CPF: string,
    card: string,
    time: string,
    storeOwner: string,
    storeName: string
}

export enum ESigns {
    PLUS = '+',
    MINUS = '-'
}

export interface ITransaction {
    transactionType: string;
    transactionDate: string;
    transactionValue: number;
}

export interface IStoreInformation {
    storeName: string;
    transactions: ITransaction[];
    balance: number;
}
