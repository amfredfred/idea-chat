import { Box } from '@mui/material'
import { ReactNode } from 'react'

export default function ContainedLayout({ children }: { children: ReactNode }) {
    return (
        <Box height={'100vh'} maxWidth={1400} width={2000} marginInline="auto" display="flex" justifyContent="center">
            <Box width="100%" >
                {children}
            </Box>
        </Box>
    )
}
