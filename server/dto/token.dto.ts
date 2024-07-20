import { IsNotEmpty } from 'class-validator';

export class Token {
  @IsNotEmpty()
  seed: string;
  @IsNotEmpty()
  tokenMint: string;
  @IsNotEmpty()
  authority: string;
  @IsNotEmpty()
  creator: string;
  @IsNotEmpty()
  quoteToken: string;
  @IsNotEmpty()
  quoteTicker: string;
  @IsNotEmpty()
  ticker: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  tokenUri: string;
  twitter?: string;
  telegram?: string;
  website?: string;
}

export class TokenResponse {
  tokenMint: string;
  authority: string;
  creator: string;
  id: string;
  seed: string;
}

export class TokenUriMetadata {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  symbol: string;
  @IsNotEmpty()
  description: string;
  image: string;
}
