import { Box, Tab, TextField } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NewlyCreatedTokens from './NewlyCreatedTokens'
import { useState } from 'react';


export default function TokenExplorer() {

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex justify-between'>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Token Explorer" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>

          <TextField
            id="standard-search"
            label="0x0...."
            type="search"
            variant="standard"
          />
        </Box>
        <TabPanel value="1">
          <NewlyCreatedTokens />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  )
}
