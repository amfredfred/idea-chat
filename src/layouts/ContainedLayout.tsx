import { Box } from '@mui/material'
import { ReactNode } from 'react'

export default function ContainedLayout({ children }: { children: ReactNode }) {
    return (
        <Box height={'100vh'} maxWidth={'100vw'} width={'calc(1400px - 1rem)'} marginInline="auto" paddingInline={'1rem'} display="flex" justifyContent="center">
            <Box width="100%" >
                {children}
            </Box>
        </Box>
    )
}
