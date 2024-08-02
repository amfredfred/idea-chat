import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks' 
import PillSVG from '../../assets/pumpfun-logo.webp'

export default function PumpfunButton({ mintAddress }: { mintAddress: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!mintAddress) return

    return (
        <Link target='_blank' to={`${mintAddress}`}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.textColor }}>
                <img src={PillSVG} style={{ width:16 }} />
            </IconButton>
        </Link>
    )
}