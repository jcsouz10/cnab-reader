import { ICNABInformation, ESigns, IStoreInformation, ITransaction } from "../../interfaces/interfaces";
import moment from 'moment';

const transactionsType = {
    1: { descricao: "Debito", natureza: "entrada", sinal: "+" },
    2: { descricao: "Boleto", natureza: "saida", sinal: "-" },
    3: { descricao: "Financiamento", natureza: "saida", sinal: "-" },
    4: { descricao: "Credito", natureza: "entrada", sinal: "+" },
    5: { descricao: "Recebimento Emprestimo", natureza: "entrada", sinal: "+" },
    6: { descricao: "Vendas", natureza: "entrada", sinal: "+" },
    7: { descricao: "Recebimento TED", natureza: "entrada", sinal: "+" },
    8: { descricao: "Recebimento DOC", natureza: "entrada", sinal: "+" },
    9: { descricao: "Aluguel", natureza: "saida", sinal: "-" },
};

export const isToSum = (sign) => {
    if (sign === ESigns.PLUS) return true;
    return false;
}

export const getStoresName = (CNABInformation) => {
    return CNABInformation.map(
        (data: any) => {
            return data.storeName;
        }
    );
}

export const getUniqueStores = (stores): string[] => {
    return [...new Set(stores)] as string[];
}

export const getCNABTransactionsFromSpecificStore = (CNABInformation, store): ICNABInformation[] => {
    return CNABInformation.filter(
        (cnab: ICNABInformation) => cnab.storeName === store
    );
}

export const buildTransactionsInformation = (storeInformation: ICNABInformation[]): ITransaction[] => {
    return storeInformation.map(
        (loja: ICNABInformation) => {
            return {
                transactionType: transactionsType[loja.registryType]?.descricao,
                transactionDate: moment(loja.creditDate).format('DD/MM/YYYY'),
                transactionValue: parseInt(loja.value) / 100
            }
        }
    );
}

export const buildBalanceInformation = (storeInformation: ICNABInformation[]): number => {
    return storeInformation.reduce(
        (prev: number, next: any) => {
            return isToSum(transactionsType[next.registryType]?.sinal) ? prev + next?.value / 100
            : prev - next.value / 100;
        }, 0)
}


export const buildStoreInformation = (CNABInformation, uniqueStores): IStoreInformation[] => {
    return uniqueStores.map((store: string) => {
        const transactionsFromCurrentStore: ICNABInformation[] = getCNABTransactionsFromSpecificStore(CNABInformation, store);
        return {
            storeName: store,
            transactions: buildTransactionsInformation(transactionsFromCurrentStore),
            balance: buildBalanceInformation(transactionsFromCurrentStore)
        };
    });
}
