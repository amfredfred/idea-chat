// components/TokenSwapConfigs.tsx
import React, { useState } from 'react';
import { MenuItem, Typography, Button, FormControl, InputLabel, Select } from '@mui/material';
import { useAppSelector } from '../../libs/redux/hooks';

const TokenSwapConfigs: React.FC = () => {
    const [priority, setPriority] = useState<string>('medium');
    const [fee, setFee] = useState<string>('0.5');
    const theme = useAppSelector(state => state.theme.current.styles)

    const priorities = useAppSelector(state => state.tokenSwap.settings.priorityOptions)
    const feeOptions = useAppSelector(state => state.tokenSwap.settings.feeOptions)

    const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPriority(event.target.value as string);
    };

    const handleFeeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFee(event.target.value as string);
    };

    const handleSave = () => {
        // Save the configuration settings
        console.log('Priority:', priority);
        console.log('Fee:', fee);
    };

    return (
        <div className="p-6" style={{ color: theme.text_color }}>
            <FormControl fullWidth className="mb-4">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                    labelId="priority-label"
                    value={priority}
                    onChange={handlePriorityChange}
                    label="Priority"
                >
                    {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth className="mb-4">
                <InputLabel id="fee-label">Fee</InputLabel>
                <Select
                    labelId="fee-label"
                    value={fee}
                    onChange={handleFeeChange}
                    label="Fee"
                >
                    {feeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Save Configurations
            </Button>
        </div>
    );
};

export default TokenSwapConfigs;