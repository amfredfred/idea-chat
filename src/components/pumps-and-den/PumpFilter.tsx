import { Box, Button, Divider, Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';

export default function PumpFilter({ onRequestClose }: { onRequestClose: () => void }) {

    const theme = useAppSelector(state => state.theme.current.styles)
    const containerRef = useRef<HTMLDivElement>(null)
    const [filters, setFilters] = useState({
        holdersLeft: '',
        holdersRight: '',
        liquidityLeft: '',
        liquidityRight: '',
        volumeLeft: '',
        volumeRight: '',
        marketCapLeft: '',
        marketCapRight: '',
        devHoldingLeft: '',
        devHoldingRight: ''
    });

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(field);
        setFilters({
            ...filters,
            [field]: event.target.value
        });
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onRequestClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onRequestClose]);

    return (
        <Box
            sx={{ background: theme.bgColor, borderColor: theme.textColor }}
            className='absolute right-0 top-0 w-[361px] rounded-lg max-w-[100%] border max-sm:bottom-0 max-sm:top-auto max-sm:w-full isolate ' >
            <div className=' fixed h-[100vh] w-[100vw] backdrop-brightness-75 left-0 top-0 -z-10 ' />
            <Box ref={containerRef} className='flex-col flex  p-4 gap-3  h-auto'>
                <Box className='grid grid-cols-5 items-center z-20'>
                    <Box
                        sx={{ color: theme.textColor }}
                        className="whitespace-nowrap col-span-3 text-[14px]">Holders</Box>
                    <Box display='flex' alignItems='center' justifyContent='space-between' className=' col-span-2 ' gap='.6rem'>
                        <Input
                            placeholder='min'
                            disableUnderline
                            type='number'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.holdersLeft} onChange={handleInputChange('holdersLeft')} />
                        <Input
                            placeholder='max'
                            disableUnderline
                            type='number'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.holdersRight} onChange={handleInputChange('holdersRight')} />
                    </Box>
                </Box>
                <Divider />

                <Box className='grid grid-cols-5 items-center'>
                    <Box
                        sx={{ color: theme.textColor }}
                        className="whitespace-nowrap col-span-3 text-[14px]">Liquidity</Box>
                    <Box display='flex' alignItems='center' justifyContent='space-between' className=' col-span-2 ' gap='.6rem'>
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='min'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.liquidityLeft} onChange={handleInputChange('liquidityLeft')} />
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='max'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.liquidityRight} onChange={handleInputChange('liquidityRight')} />
                    </Box>
                </Box>
                <Divider />

                <Box className='grid grid-cols-5 items-center'>
                    <Box
                        sx={{ color: theme.textColor }}
                        className="whitespace-nowrap col-span-3 text-[14px]">Volume</Box>
                    <Box display='flex' alignItems='center' justifyContent='space-between' className=' col-span-2 ' gap='.6rem'>
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='min'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.volumeLeft} onChange={handleInputChange('volumeLeft')} />
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='max'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.volumeRight} onChange={handleInputChange('volumeRight')} />
                    </Box>
                </Box>
                <Divider />

                <Box className='grid grid-cols-5 items-center'>
                    <Box
                        sx={{ color: theme.textColor }}
                        className="whitespace-nowrap col-span-3 text-[14px]">Market cap</Box>
                    <Box display='flex' alignItems='center' justifyContent='space-between' className=' col-span-2 ' gap='.6rem'>
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='min'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.marketCapLeft} onChange={handleInputChange('marketCapLeft')} />
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='max'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.marketCapRight} onChange={handleInputChange('marketCapRight')} />
                    </Box>
                </Box>
                <Divider />

                <Box className='grid grid-cols-5 items-center'>
                    <Box
                        sx={{ color: theme.textColor }}
                        className="whitespace-nowrap col-span-3 text-[14px]">Dev holding %</Box>
                    <Box display='flex' alignItems='center' justifyContent='space-between' className=' col-span-2 ' gap='.6rem'>
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='min'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.devHoldingLeft} onChange={handleInputChange('devHoldingLeft')} />
                        <Input
                            disableUnderline
                            type='number'
                            placeholder='max'
                            inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                            style={{ border: 'solid thin black', borderColor: theme.textColor }}
                            className=' px-2 w-[80px] rounded-md input-number' value={filters.devHoldingRight} onChange={handleInputChange('devHoldingRight')} />
                    </Box>
                </Box>
                <Divider />

                <Box className='flex justify-between items-center gap-4'>
                    <Button sx={{ flexGrow: 1, padding: '.5rem', color: 'red', background: 'transparent' }} disableElevation><strong>Reset</strong></Button>
                    <Button sx={{ flexGrow: 1, background: theme.textColor, padding: '.5rem', color: theme.buttonColor }} disableElevation>Apply</Button>
                </Box>
            </Box>
        </Box>
    );
}
