# API Documentation

This document provides detailed information about the available endpoints and their functionalities for managing tokens and uploading files to IPFS.

## Endpoints

### 1. Upload Token
- **URL:** `/token/upload`
- **Method:** `POST`
- **Description:** This endpoint uploads a created token to the system.
- **Request Body:** The request body should contain a JSON object representing the token, which adheres to the `Token` class structure.
- **Response:** Returns a `Promise` resolving to a `TokenResponse` object.

#### Example Request
```json
POST /token/upload
{
  "seed": "DxGodSfhrVhMZUPdXhNiJvHQc9ZWwScSJg2jXmSq139H",
  "tokenMint": "9gmUhRCUaa6zsRr4HKuEAs6vSYxfMyQ5XWDjwsnyyT2H",
  "authority": "3yvMpoJq26QtS9uNyhXQR2wYBxmLRTz9QuHh4WiHox7Z",
  "creator": "3yvMpoJq26QtS9uNyhXQR2wYBxmLRTz9QuHh4WiHox7Z",
  "quoteToken": "6DscavWpV6f5sxVNW7xjTX9QxpG3XLwb8S8fbRrSb6xU",
  "ticker": "GLD",
  "name": "GOLD",
  "description": "This is the gold coin",
  "image": "https://ipfs.io/ipfs/QmXJkHamXYusq81MWysrib4oXtiKxgD6q5AiMPDNTjiahk",
  "quoteTicker": "USDC",
  "twitter": null,
  "telegram": null,
  "website": null
}
```

#### Example Response
```json
{
    "status": "success",
    "message": "Token created succesfully",
    "data": {
        "tokenMint": "9gmUhRCUaa6zsRr4HKuEAs6vSYxfMyQ5XWDjwsnyyT2H",
        "authority": "3yvMpoJq26QtS9uNyhXQR2wYBxmLRTz9QuHh4WiHox7Z",
        "creator": "3yvMpoJq26QtS9uNyhXQR2wYBxmLRTz9QuHh4WiHox7Z",
        "seed": "9gmUhRCUaa6zsRr4HKuEAs6vSYxfMyQ5XWDjwsnyyT2H",
        "id": "666c20e2bd5f6bed892ec347"
    }
}
```

### 2. Upload File to IPFS
- **URL:** `/file/upload`
- **Method:** `POST`
- **Description:** This endpoint uploads a file to IPFS.
- **Request Body:** The request body should contain metadata adhering to the `TokenUriMetadata` class structure.
- **Form Data:** The file should be uploaded as form-data with the key `file`.
- **Response:** Returns a `Promise<object>` resolving to the result of the file handling process. This object contains the image url and token uri.


#### Example Request

```http
POST /file/upload
Content-Type: multipart/form-data

file: <binary-data>
metadata: {
  "name": "RUM COIN"
  "symbol": "RUM"
  "description": "This is the rum coin"
}
```

#### Example Response
```json
{
      "status": "success",
      "message": "File uploaded to IPFS successfully",
      "data": {
        "uri": "https://ipfs.io/ipfs/QmXJkHamXYusq81MWysrib4oXtiKxgD6q5AiMPDNTjiahk",
        "image": "https://ipfs.io/ipfs/QmNvW1guKChxAFqPCaCEsAYUTJogVF1zStrfQzEJrrRcWL",
      },
    };
```

### 3. Fetch All Tokens
- **URL:** `/token/fetch`
- **Method:** `GET`
- **Description:** This endpoint fetches all tokens.
- **Response:** Returns a `Promise` resolving to an array of all tokens.

#### Example Request
```http
GET /token/fetch
```

#### Example Response
```json
{
  "data": [
    {
      "id": "token-id-1"
      // token details
    },
    {
      "id": "token-id-2"
      // token details
    }
    // more tokens
  ]
}
```

### 4. Fetch Token by ID
- **URL:** `/token/fetch/:id`
- **Method:** `GET`
- **Description:** This endpoint fetches a specific token by its ID.
- **Path Parameter:**
  - `id` (string): The ID of the token to fetch.
- **Response:** Returns a `Promise` resolving to the details of the requested token.

#### Example Request
```http
GET /token/fetch/9gmUhRCUaa6zsRr4HKuEAs6vSYxfMyQ5XWDjwsnyyT2H
```

#### Example Response
```json
{
  "status": "success",
  "data": {
    "id": "12345"
    // token details
  }
}
```

## Classes

### `Token`
This class represents the structure of a token. It includes the following properties:

- `seed` (string)
- `tokenMint` (string)
- `authority` (string)
- `creator` (string)
- `quoteToken` (string)
- `ticker` (string)
- `name` (string)
- `description` (string)
- `tokenUri` (string)
- `quoteTicker` (string)
- `twitter` (string, optional)
- `telegram` (string, optional)
- `website` (string, optional)

### `TokenUriMetadata`
This class represents the metadata for a token URI. It includes properties necessary for describing the token's URI. This class is pinned as a json on the ipfs protocol and used in creating the token.
- `name` (string)
- `description` (string)
- `image` (string)
- `symbol` (string)


### `TokenResponse`
This class represents the response structure for a token creation request.
- `seed` (string)
- `tokenMint` (string)
- `authority` (string)
- `creator` (string)
- `id` (string)

## Methods

### `createUser(body: Token): Promise<TokenResponse>`
This method creates a new token based on the provided `Token` object.

### `uploadToIPFS(body: TokenUriMetadata, file: Express.Multer.File)`
This method uploads a file to IPFS and handles token URIs based on the provided `TokenUriMetadata` object and the uploaded file. This url returned is used in creating the token.


### `fetchAllTokens(): Promise<any>`
This method fetches all tokens from the system.

### `fetchToken(seed: string): Promise<any>`
This method fetches a specific token by its seed.