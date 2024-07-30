import { Box, Grid, Typography, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';


const TokenSelection = () => {
    const tokens = [
        { symbol: 'ETH', name: '', image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628' },
        { symbol: 'DAI', name: '', image: 'https://cdn.paraswap.io/token/DAI.png' },
        { symbol: 'USDC', name: '', image: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694' },
        { symbol: 'WETH', name: '', image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png' },
        { symbol: 'WBTC', name: '', image: 'https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857' },
        { symbol: 'USDT', name: '', image: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661' },
    ];

    return (
        <Box className="active">
            <Grid container direction="column">
                <Grid container item alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography variant="h3">Receive...</Typography>
                    </Grid>
                    <Grid item>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.22625 9.76912C0.533021 10.0759 1.0484 10.0636 1.3429 9.77525L4.99961 6.11854L8.65018 9.77525C8.95082 10.0759 9.46619 10.0759 9.76683 9.76912C10.0675 9.46235 10.0736 8.95311 9.77297 8.65247L6.12239 4.99576L9.77297 1.34518C10.0736 1.04455 10.0736 0.535308 9.76683 0.228537C9.46006 -0.0720982 8.95082 -0.0782337 8.65018 0.222402L4.99961 3.87911L1.3429 0.222402C1.0484 -0.0659628 0.526885 -0.0782337 0.22625 0.228537C-0.0743861 0.535308 -0.0682506 1.05068 0.220114 1.33905L3.87683 4.99576L0.220114 8.65861C-0.0682506 8.94697 -0.0805215 9.46848 0.22625 9.76912Z"></path>
                        </svg>
                    </Grid>
                </Grid>
                <Grid item>
                    <InputBase
                        placeholder="Find tokens by name or address"
                        startAdornment={<SearchIcon />}
                        fullWidth
                    />
                </Grid>
                <Grid container>
                    {tokens.map((token, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Box>
                                <img src={token.image} alt="Token symbol" title={token.symbol} />
                                <Typography>{token.symbol}</Typography>
                                <Typography>{token.name}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TokenSelection;