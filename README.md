<p align="center">
<h4 align="center">bycoders_</h3>

</p>

<h3 align="center">CNAB Reader</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---


## 🧐 About <a name = "about"></a>
Web interface that accepts CNAB file upload, normalizes the data and stores it in a relational database and displays this information on screen.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites
What you need to have installed in your machine to run this app:

```
Docker;
```

### Installing
To install Docker:

If you have a Mac, you can follow these steps:
```
https://docs.docker.com/desktop/mac/install/
```

If you have a Windows, you can follow these steps:
```
https://docs.docker.com/desktop/windows/install/
```

## 🔧 Running the tests <a name = "tests"></a>
```
npm run test
```
<img width="848" alt="Screen Shot 2022-03-18 at 18 49 39" src="https://user-images.githubusercontent.com/34487772/159087710-af0f0ed6-6fa5-43c3-8851-9d88a7d972b8.png">


## 🎈 Usage <a name="usage"></a>
You can run this with Docker:

```
docker-compose up --build
```

On the home screen, upload your CNAB file.

After that, a list of transactions read from the CNAB will be shown.


## 👥	 Consume the API <a name = "tests"></a>

endpoint:
```
/api/upload/cnab
```

How to transform your CNAB:

```
1- Send the file as <BUFFER> in `file` attribute;
2- After that, the you will receive the response with the CNAB data processed per store;
```
Follow the result type:

#### IStoreInformation[]

```
    storeName: string;
    transactions: ITransaction;
    balance: number;
```

#### ITransaction[]
```
    transactionType: string;
    transactionDate: string;
    transactionValue: number;
```

## ⛔ Obs
```
Make sure your CNAB file doesn't have any white space.
```

```
You can connect to the database to see the saved data.
```

## ⛏️ Built Using <a name = "built_using"></a>
- [Postgres](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJS](https://reactjs.org/) - Web Framework
- [Typescript](https://www.typescriptlang.org/) - Syntax Type
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Jest](https://jestjs.io/pt-BR/) - Test Tool
- [Docker](https://www.docker.com/) - Container Virtualization
