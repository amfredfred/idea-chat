import { Box, Button, Divider, Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { IPumpRequestParams } from '../../common/types';
import { setSearchParams } from '../../libs/redux/slices/pump-socket-slice';

export default function PumpFilter({ onRequestClose }: { onRequestClose: () => void }) {

    const theme = useAppSelector(state => state.theme.current.styles);
    // const currentFilters = useAppSelector(state => state.pumpSocket.searchParams);
    const dispatch = useAppDispatch()
    const containerRef = useRef<HTMLDivElement>(null);
    const [filters, setFilters] = useState<IPumpRequestParams>({
        filter_listing: [
            { name: 'holders', type: 'number', min: null, max: null },
            { name: 'liquidity', type: 'number', min: null, max: null },
            { name: 'volume', type: 'number', min: null, max: null },
            { name: 'marketCap', type: 'number', min: null, max: null },
            { name: 'devHolding', type: 'percentage', min: null, max: null },
            // ...currentFilters.filter_listing
        ],
        filter_migrated: []
    });

    const handleInputChange = (name: 'holders' | 'liquidity' | 'volume' | 'marketCap' | 'devHolding', field: 'min' | 'max') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseFloat(event.target.value) : null;
        setFilters(prevFilters => ({
            ...prevFilters,
            filter_listing: prevFilters.filter_listing.map(filter =>
                filter.name === name ? { ...filter, [field]: value } : filter
            )
        }));
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

    const applyFilters = () => {
        // onRequestClose()
        dispatch(setSearchParams(filters['filter_listing']))
    }

    return (
        <Box
            sx={{ background: theme.bgColor, borderColor: theme.textColor }}
            className='absolute right-0 top-0 w-[361px] rounded-lg max-w-[100%] border max-sm:bottom-0 max-sm:top-auto max-sm:w-full isolate'>
            <div className='fixed h-[100vh] w-[100vw] backdrop-brightness-75 left-0 top-0 -z-10' />
            <Box ref={containerRef} className='flex-col flex p-4 gap-3 h-auto'>
                {filters.filter_listing.map(filter => (
                    <Box key={filter.name} className='grid grid-cols-5 items-center'>
                        <Box
                            sx={{ color: theme.textColor }}
                            className="whitespace-nowrap col-span-3 text-[14px] capitalize">{filter.name}</Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' className='col-span-2' gap='.6rem'>
                            <Input
                                placeholder='min'
                                disableUnderline
                                type='number'
                                inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                                style={{ border: 'solid thin black', borderColor: theme.textColor }}
                                className='px-2 w-[80px] rounded-md input-number'
                                value={filter.min !== null ? filter.min : ''}
                                onChange={handleInputChange(filter.name, 'min')} />
                            <Input
                                placeholder='max'
                                disableUnderline
                                type='number'
                                inputProps={{ style: { textAlign: 'center', color: theme.textColor } }}
                                style={{ border: 'solid thin black', borderColor: theme.textColor }}
                                className='px-2 w-[80px] rounded-md input-number'
                                value={filter.max !== null ? filter.max : ''}
                                onChange={handleInputChange(filter.name, 'max')} />
                        </Box>
                        <Divider />
                    </Box>
                ))}
                <Box className='flex justify-between items-center gap-4'>
                    <Button onClick={() => dispatch(setSearchParams([]))} sx={{ flexGrow: 1, padding: '.5rem', color: 'red', background: 'transparent' }} disableElevation><strong>Reset</strong></Button>
                    <Button onClick={applyFilters} sx={{ flexGrow: 1, background: theme.textColor, padding: '.5rem', color: theme.buttonColor }} disableElevation>Apply</Button>
                </Box>
            </Box>
        </Box>
    );
}
