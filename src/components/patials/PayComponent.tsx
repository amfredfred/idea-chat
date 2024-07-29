import { Box, Grid, Typography, Paper, InputBase } from '@mui/material';
import { styled } from '@mui/system';

// Styled components using MUI's system
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme?.shadows?.[1],
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: theme?.spacing?.(1),
    width: '100%',
}));

const PayComponent = () => {
    return (
        <div className="p-6">
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginBottom: '8px' }}>
                <Typography variant="h5">Pay</Typography>
            </Grid>
            <StyledPaper>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                        <Box>
                            <StyledInput
                                placeholder="0"
                                type="text"
                                inputMode="decimal"
                                pattern="^\d*[.,]?\d*$"
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box className="flex items-center">
                            <img
                                className="w-6 h-6 mr-2"
                                src="https://cdn.paraswap.io/token/DAI.png"
                                alt="Token symbol"
                                title="0x6b175474e89094c44da98b954eedeac495271d0f"
                            />
                            <Typography variant="body1">
                                <span className="font-medium">DAI</span>
                            </Typography>
                            <span className="ml-1">
                                <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.80952 1.09521L5 4.90474L1.19048 1.09521"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </Box>
                    </Grid>
                </Grid>
            </StyledPaper>
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginTop: '1px' }}>
                <Typography variant="h5" data-testid="destination-usd-amount">
                    ~$3.3K
                </Typography>
                <div className="jss148"></div>
            </Grid>
        </div>
    );
};

export default PayComponent;