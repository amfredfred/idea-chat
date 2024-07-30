import React from 'react';
import { Box, Grid, Typography, Paper, InputBase, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import { ITokenSwapInputProps } from '../../common/types';

const StyledPaper = styled(Paper)(() => ({
    borderRadius: '50px',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    paddingInline: '.6rem',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: theme.spacing(1),
    width: '100%',
}));

const TokenSwapInput: React.FC<ITokenSwapInputProps> = ({
    side,
    onChange,
    tokens,
    selectedToken,
    onTokenSelect,
    amount
}) => {
    return (
        <Box className="w-full" width={'100%'}>
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginBottom: '8px' }}>
                <Typography variant="body2" className='text-white' style={{ textTransform: 'capitalize' }}>{side}</Typography>
            </Grid>
            <StyledPaper>
                <StyledInput
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    // pattern="^\d*[.,]?\d*$"
                    onChange={({ target: { value } }) => onChange(value)}
                />
                <Select
                    value={selectedToken ? selectedToken.symbol : ''}
                    onChange={(e: SelectChangeEvent<string>) => {
                        const token = tokens.find(t => t.symbol === e.target.value);
                        if (token) onTokenSelect(token);
                    }}
                    displayEmpty
                    variant="standard"
                    disableUnderline
                    IconComponent={undefined}
                    style={{ paddingInline: '.6rem', background: 'green', borderRadius: '50px', alignItems: 'center', maxHeight: '50px' }}
                >
                    {tokens.map(token => (
                        <MenuItem key={token.symbol} value={token.symbol}  >
                            <Box display='flex' alignItems='center' flexDirection='row'>
                                <img
                                    className="w-6 h-6 mr-2 rounded-full aspect-square"
                                    src={token.logo}
                                    alt={`${token.symbol} token`}
                                />
                                <Typography variant="body2">
                                    {token.symbol}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </StyledPaper>
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginTop: '1px' }}>
                <Typography variant="h5" data-testid="destination-usd-amount">
                    {amount}
                </Typography>
            </Grid>
        </Box>
    );
};

export default TokenSwapInput;