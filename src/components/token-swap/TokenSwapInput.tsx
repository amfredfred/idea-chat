import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, InputBase, MenuItem, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ITokenSwapInputProps } from '../../common/types';
import TokenSelection from './TokenSelection';

const StyledPaper = styled(Paper)(() => ({
    boxShadow: 'none',
    background: 'rgba(0, 0, 0, 0.45)'
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: theme.spacing(1),
    width: '100%',
    color: 'white',
    fontWeight: 900
}));

const TokenSwapInput: React.FC<ITokenSwapInputProps> = ({
    side,
    onChange,
    selectedToken,
    onTokenSelect,
    amount,
    readonly,
    value,
    loading
}) => {
    const [isTokensListOpen, setIsTokensListOpen] = useState(false);

    const handleOnTokenSelect = (token: any) => {
        setIsTokensListOpen(false);
        onTokenSelect(token);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // Only allow numbers and a single decimal point
        if (/^\d*\.?\d*$/.test(newValue)) {
            onChange(newValue);
        }
    };

    return (
        <Box className="w-full" width={'100%'} >
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginBottom: '8px' }}>
                <Typography variant="body2" className='text-white' style={{ textTransform: 'capitalize' }}>{side}</Typography>
            </Grid>
            <StyledPaper style={{ borderRadius: '.5rem' }} className='bg-slate-700'>
                <Box display='flex' flexDirection='row' gap='1rem' paddingInline='.6rem' alignItems='center'>
                    <StyledInput
                        placeholder="0"
                        type="text"
                        inputMode="decimal"
                        readOnly={readonly}
                        // pattern="^\d*\.?\d*$"
                        value={value}
                        onChange={handleInputChange}
                    />
                    {loading && (
                        <Box>
                            <CircularProgress size={20} thickness={10} />
                        </Box>
                    )}
                    <Box
                        onClick={() => setIsTokensListOpen(state => !state)}
                        display='flex'
                        alignItems='center'
                        paddingInline='.4rem'
                        borderRadius='50px'
                        margin='auto'
                        style={{ background: 'whitesmoke', maxHeight: '40px' }}
                    >
                        <MenuItem key={selectedToken?.symbol} value={selectedToken?.symbol}>
                            <Box gap={'.3rem'} display='flex' alignItems='center' flexDirection='row' justifyContent='center'>
                                <img
                                    className="w-6 h-6 rounded-full aspect-square"
                                    src={selectedToken?.logo}
                                    alt={`${selectedToken?.symbol} selectedToken?`}
                                />
                                <Typography variant="body2">
                                    {selectedToken?.symbol}
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Box>
                </Box>
            </StyledPaper>
            <TokenSelection
                onRequestClose={setIsTokensListOpen}
                onTokenSelect={handleOnTokenSelect}
                isOpen={isTokensListOpen}
            />
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginTop: '1px' }}>
                <Typography variant="h5" data-testid="destination-usd-amount">
                    {amount}
                </Typography>
            </Grid>
        </Box>
    );
};

export default TokenSwapInput;
