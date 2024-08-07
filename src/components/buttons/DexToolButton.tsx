import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'

export default function DexToolButton({ mintAddress }: { mintAddress: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!mintAddress) return

    return (
        <Link target='_blank' to={`${mintAddress}`}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.text_color }}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.4304 0.925011C3.61432 1.35013 2.94665 1.70986 2.94679 1.72449C2.94715 1.76225 4.90542 2.75399 4.97492 2.75157C5.00654 2.75052 5.2359 2.64494 5.48459 2.51698L5.93681 2.28438L6.43071 2.53825L6.92457 2.79217L7.73337 2.42874C8.95207 1.8811 9.07865 1.82109 9.0588 1.80093C9.03248 1.77418 8.59536 1.53935 7.40941 0.914994C6.83626 0.613234 6.27997 0.317369 6.17317 0.2575C6.06639 0.197632 5.96445 0.149472 5.94664 0.150404C5.92883 0.151336 5.2465 0.499913 4.4304 0.925011ZM0.851066 2.77851L0.00153266 3.21733V5.1432C0.00153266 6.20244 0.0126879 7.06905 0.0263712 7.06905C0.0400071 7.06905 0.45798 6.88786 0.955176 6.66642L1.85917 6.26379V4.23379L2.30093 4.47447C2.64134 4.65976 2.98195 4.84467 3.32277 5.02921L3.90284 5.34328L4.16096 5.22656C4.32284 5.15324 4.48439 5.07921 4.64562 5.00447C4.77021 4.94645 5.07605 4.8087 5.32524 4.6983C5.57443 4.58785 5.8051 4.47679 5.83781 4.45148C5.88126 4.41785 5.35143 4.12507 3.87814 3.36851C2.7676 2.79822 1.82334 2.33343 1.77979 2.33565C1.73625 2.33788 1.31832 2.53714 0.851066 2.77851ZM9.21191 2.90174C8.63332 3.16294 8.15953 3.38709 8.15899 3.39987C8.15849 3.41264 8.47383 3.60014 8.85981 3.81648C9.24575 4.03287 9.56154 4.22149 9.56154 4.23569C9.56154 4.24986 9.22002 4.41534 8.80264 4.6035C8.38521 4.7916 7.33012 5.26808 6.45795 5.66236L3.53557 6.98331C2.80045 7.31563 2.13782 7.61516 2.06307 7.64902C0.561537 8.32875 0.148826 8.51736 0.092149 8.54974C0.0351563 8.58233 0.0222472 8.7717 0.0121032 9.72215L0 10.8558L0.759692 11.2428L1.51937 11.6299L2.57278 11.1545C3.15217 10.893 3.62618 10.6654 3.62618 10.6487C3.62618 10.6319 3.51912 10.5622 3.38832 10.4936C3.25746 10.425 2.98734 10.2731 2.78798 10.156C2.58864 10.0389 2.38987 9.93148 2.34623 9.91723C2.3026 9.90302 2.26754 9.87817 2.26825 9.86196C2.26898 9.84579 2.73285 9.62545 3.29902 9.37228C4.39869 8.88062 5.24025 8.50167 7.04695 7.68464C7.85484 7.31937 8.66283 6.95432 9.47093 6.5895C10.1811 6.26894 11.0069 5.89454 11.3059 5.75752L11.8496 5.50839L11.8617 4.36189L11.8738 3.21543L11.1033 2.81994C10.6795 2.60245 10.3173 2.42502 10.2983 2.42567C10.2793 2.42627 9.79045 2.64048 9.21191 2.90174ZM11.6432 7.03789C11.5296 7.09335 11.3054 7.19719 11.1448 7.26863C10.9842 7.34006 10.6795 7.47754 10.4677 7.57419L10.0826 7.74985L10.0738 8.75638C10.0689 9.30995 10.0486 9.76042 10.0285 9.7575C9.98291 9.75072 9.26111 9.38055 8.53555 8.99176C8.01187 8.71119 7.97897 8.70003 7.85592 8.76097C7.78479 8.79622 7.35958 8.98692 6.91103 9.18482C6.46247 9.3827 6.08085 9.55751 6.0629 9.57334C6.045 9.58915 6.94777 10.0784 8.0691 10.6607L10.1078 11.7194L10.9787 11.2689C11.4577 11.0211 11.865 10.7951 11.8837 10.7667C11.9259 10.7028 11.9223 6.92828 11.8801 6.93339C11.8633 6.93539 11.7567 6.98243 11.6432 7.03789ZM6.82041 11.4682C6.66935 11.5332 6.51832 11.5982 6.36733 11.6634C5.91139 11.8606 6.00074 11.8671 5.45831 11.5971C5.09703 11.4173 4.9413 11.3618 4.8737 11.3887C4.823 11.4089 4.38663 11.6052 3.90393 11.825C3.42125 12.0447 3.00958 12.2245 2.98911 12.2245C2.78659 12.2245 3.12327 12.4256 4.42244 13.081L5.94606 13.8495L6.58712 13.533C6.93971 13.3589 7.65086 13.0103 8.16751 12.7584C8.68411 12.5064 9.10041 12.2937 9.09262 12.2856C9.08476 12.2776 8.65189 12.0553 8.13063 11.7917L7.18288 11.3123L6.82041 11.4682Z" fill={theme.active_color}/>
                </svg>
            </IconButton>
        </Link>
    )
}