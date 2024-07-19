import { Box, TextField } from '@mui/material'
import NewlyCreatedTokens from './NewlyCreatedTokens'


export default function TokenExplorer() {

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex justify-between'>
        <div>s</div>
        <TextField
          id="standard-search"
          label="0x0...."
          type="search"
          variant="standard"
        />
      </Box> */}

      <Box className='flex justify-between gap-4' >
        <NewlyCreatedTokens />
        <NewlyCreatedTokens />
        <NewlyCreatedTokens />
      </Box>
    </Box>
  )
}
