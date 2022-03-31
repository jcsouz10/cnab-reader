import { ICNABInformation } from "../../interfaces/interfaces";

const readCNABData = (CNABRaw: string[]): ICNABInformation[] | [] => {
    const isCNABRawValid = CNABRaw.every((CNBAString: string) => {
        return CNBAString.match(/^\d{33}[0-9]/)
    })  

    if (isCNABRawValid) {
        const read: ICNABInformation[] = CNABRaw.map((cnab: string) => {
            const registryType = cnab.slice(0, 1);
            const creditDate = cnab.slice(1, 8);
            const value = cnab.slice(9, 18);
            const CPF = cnab.slice(19, 29);
            const card = cnab.slice(30, 41);
            const time = cnab.slice(42, 47);
            const storeOwner = cnab.slice(48, 61);
            const storeName = cnab.slice(62, 80);
    
            return {
                registryType,
                creditDate,
                value,
                CPF,
                card,
                time,
                storeOwner,
                storeName
            };
        });
    
        return read;
    }

    return []
};

export default readCNABData;
