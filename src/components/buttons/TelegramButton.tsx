import { Telegram } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'

export default function TelegramButton({ url }: { url: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!url) return

    return (
        <Link target='_blank' to={url ?? '#invalid-link'}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.textColor }}>
                <Telegram className=' text-[5px]' color='action' style={{ color: theme.textColor, fontSize: 16 }} />
            </IconButton>
        </Link>
    )
}