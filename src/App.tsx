import "./App.css";
import React, { useRef, useState } from "react";
import { ReactComponent as BycodersSVG } from "./bycoders.svg";
import axios from "axios";
import {
    OpenFileLabel,
    StoreBalance, 
    StoreHeader, 
    StoreName, 
    Transaction, 
    TransactionContainer, 
    TransactionDate, 
    TransactionInformationContainer, 
    TransactionType, 
    TransactionValue, 
    Upload, 
    UploadBorder, 
    UploadContainer, 
    UploadNewFileLabel, 
    Wrapper
} from './styled';
import { IStoreInformation, ITransaction } from "../interfaces/interfaces";

function App() {
    const [storeInformation, setStoreInformation] = useState<IStoreInformation[]>([]);
    const imageRef: any = useRef();
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>('');

    const handleCNABFile = (event) => {
        const CNABData = new FormData();
        const file = event.target && event.target.files && 
        event.target.files.length > 0 && event.target.files[0];

        CNABData.append("file", file);

        axios
            .post("/api/upload/cnab", CNABData, {})
            .then((res) => {
                setStoreInformation(res.data);
                setIsUploaded(true)
            })
            .catch((err) => {
                setIsUploaded(true)
                setMessageError(err.response.data)
            });
    };

    const handleTrasactionType = (transactionType) => {
        if(transactionType === 'Boleto' ||
        transactionType === 'Financiamento' || 
        transactionType === 'Aluguel') return  '-' 

        return ''
    }
    return (
        <Wrapper>
            {isUploaded && messageError}
            {!isUploaded ? 
            <UploadContainer>
                <h1>Carregue seu CNAB.</h1>
                <Upload>
                    <UploadBorder>
                        <input
                            accept=".txt"
                            ref={imageRef}
                            style={{ display: "none" }}
                            type="file"
                            onChange={(event) => handleCNABFile(event)}
                        />
                        <BycodersSVG
                            style={{
                                width: "150px",
                                height: "90px",
                            }}
                        />
                        <p>
                            <OpenFileLabel
                                onClick={() => imageRef.current.click()}
                                href="#"
                            >
                                Abra
                            </OpenFileLabel>{" "}
                            de seu computador.
                        </p>
                    </UploadBorder>
                </Upload>
            </UploadContainer> 
            : ""}
            {storeInformation.length > 0
                ? storeInformation.map((store: IStoreInformation) => {
                      return (
                          <div>
                              <StoreHeader>
                                  <StoreName>
                                      {store.storeName}
                                  </StoreName>
                                  <StoreBalance> SALDO: R$ {store.balance.toFixed(2)}</StoreBalance>
                              </StoreHeader>
                              <TransactionContainer> 
                                    {store.transactions.map((transaction: ITransaction) => {
                                        return (
                                        <Transaction transactionType={transaction.transactionType}> 
                                            <TransactionInformationContainer>
                                                <TransactionType>{transaction.transactionType}</TransactionType>
                                                <TransactionDate>{transaction.transactionDate}</TransactionDate>
                                            </TransactionInformationContainer>
                                            <TransactionValue>
                                                    R$ {handleTrasactionType(transaction.transactionType)}
                                                     {transaction.transactionValue.toFixed(2)}
                                            </TransactionValue>
                                        </Transaction>
                                        )
                                    })}
                              </TransactionContainer>
                          </div>
                      );
                  })
                : ""}
                {isUploaded && <UploadNewFileLabel onClick={() => {
                    setStoreInformation([])
                    setIsUploaded(false)
                }}> Carregar novo CNAB </UploadNewFileLabel>}
        </Wrapper>
    );
}

export default App;
