import styled from 'styled-components';

export const Wrapper = styled.div`
margin: auto;
max-width: 640px;
padding-top: 60px;
text-align: center;
`

export const UploadContainer = styled.div`
background-color: #f9f9f9;
padding: 20px;
border-radius: 10px;

}
`

export const Upload = styled.div`
background-color: rgb(239, 239, 239);
border-radius: 6px;
padding: 10px;
color: black;
font-weight: 600;
font-size: 1.1em;
letter-spacing: -1px;
opacity: 0.65;
`
export const UploadBorder = styled.div`
padding:20px;
border: 5px dashed hsla(0,0%,78%,.65);
`

export const Transaction = styled.div`
margin: 6px;
padding: 8px;
background-color: #2f2f33;
width: 200px;
height: 60px;
display: flex;
justify-content: space-between;
border-radius: 6px;
color: white;
border-left: 15px solid ${((props) => props.transactionType === 'Boleto' || props.transactionType === 'Financiamento' || props.transactionType === 'Aluguel' ? '#d60e0e' : '#4e9a4f')}
`;


export const TransactionContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
flex-wrap: wrap;
padding: 15px 2px;
height: 100%;
`

export const TransactionValue = styled.p`
font-size: 10px;
`

export const TransactionInformationContainer = styled.div`
display: flex;
flex-direction: column;
`

export const TransactionType = styled.span`
width: 0px;
`

export const TransactionDate = styled.span`
width: 0px;
font-size: 10px;
`

export const StoreHeader = styled.div`
background-color: white;
display: flex;
justify-content: space-between;
margin: 10px 0 0 0;
box-shadow: 0 0 1em black;
border-radius: 5px;
`

export const StoreBalance = styled.p`
color: black;
padding: 0 10px 0 0;
font-weight: bold;
`

export const StoreName = styled.p`
color: black;
padding: 0 0 0 10px;
`

export const OpenFileLabel = styled.span`
text-decoration: none !important;
color: rgb(22, 42, 255) !important;
border-bottom: 3px dotted rgba(22, 22, 255, 0.85);
cursor: pointer;
`

export const UploadNewFileLabel = styled.p`
color: white;
cursor: pointer;
font-weight: bold

`