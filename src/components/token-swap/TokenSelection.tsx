import { Box, Grid, Typography, InputBase, MenuItem } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { ITokenSwapInputProps } from '../../common/types';
import { useAppSelector } from '../../libs/redux/hooks';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'

const TokenSelection: React.FC<{
    onTokenSelect: ITokenSwapInputProps['onTokenSelect'],
    isOpen: boolean,
    onRequestClose: (state: boolean) => void
}> = ({ onTokenSelect, isOpen, onRequestClose }) => {

    const tokensList = useAppSelector(state => state.tokenSwap.tokensList)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (event.target !== containerRef.current && !containerRef.current?.contains(event.target as any)) {
                onRequestClose(false)
            }
        })
        return document.removeEventListener('mousedown', () => { })
    }, [onRequestClose, isOpen])

    if (!isOpen) return

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef} className="active rounded-lg   mt-4 flex text-yellow-100" style={{ maxHeight: '30vh' }} >
            <Box flexDirection="column" display='flex' overflow='hidden' width='100%' >
                <Grid item>
                    <InputBase
                        placeholder="Find tokens by name or address"
                        startAdornment={<SearchIcon className='text-yellow-100 mr-2' />}
                        fullWidth
                        className='text-yellow-100'
                        style={{ color: 'white' }}
                    />
                </Grid>
                <Box display='flex' flexDirection='column' gap='.5rem' width='100%' className=' no-scrollbar' overflow='auto'>
                    {tokensList?.map?.((token,) => (
                        <MenuItem onClick={() => onTokenSelect(token)} key={token.symbol} value={token.symbol} style={{ paddingInline: 0, borderRadius: '10px' }}   >
                            <Box display='flex' alignItems='center' flexDirection='row' >
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
                </Box>
            </Box>
        </motion.div>
    );
};

export default TokenSelection;