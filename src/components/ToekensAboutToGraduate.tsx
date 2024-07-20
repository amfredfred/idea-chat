import PumpCard, { IPumpCard } from "./PumpCard";

export default function ToekensAboutToGraduate({ pools }: { pools: IPumpCard[] }) {

    return (
        <div className="flex flex-col gap-y-3 p-0 md:p-3 h-full md:h-auto">
            <div className="flex items-center justify-between px-3 pt-3 md:px-0 md:pt-0"><div className="flex items-center pb-2"><span className="text-base leading-none size-4">🎓</span><span className="text-grey-50 text-sm font-medium ml-[6px]">About to Graduate</span></div><button type="button" className="ant-btn ant-btn-default !h-[36px] w-[36px] md:w-auto !border-none !px-2 !bg-grey-500 hover:!bg-grey-600 !flex !gap-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 10" fill="none" className="text-grey-200"><path d="M14.375 0.5C14.5233 0.5 14.6683 0.543987 14.7917 0.626398C14.915 0.708809 15.0111 0.825943 15.0679 0.962988C15.1247 1.10003 15.1395 1.25083 15.1106 1.39632C15.0816 1.5418 15.0102 1.67544 14.9053 1.78033C14.8004 1.88522 14.6668 1.95665 14.5213 1.98559C14.3758 2.01453 14.225 1.99968 14.088 1.94291C13.9509 1.88614 13.8338 1.79001 13.7514 1.66668C13.669 1.54334 13.625 1.39834 13.625 1.25C13.625 1.05109 13.704 0.860322 13.8447 0.71967C13.9853 0.579018 14.1761 0.5 14.375 0.5ZM11.375 2H0.875C0.676087 2 0.485322 1.92098 0.344669 1.78033C0.204017 1.63968 0.125 1.44891 0.125 1.25C0.125 1.05109 0.204017 0.860322 0.344669 0.71967C0.485322 0.579018 0.676087 0.5 0.875 0.5H11.375C11.5739 0.5 11.7647 0.579018 11.9053 0.71967C12.046 0.860322 12.125 1.05109 12.125 1.25C12.125 1.44891 12.046 1.63968 11.9053 1.78033C11.7647 1.92098 11.5739 2 11.375 2ZM11.375 4.25C11.5233 4.25 11.6683 4.29399 11.7917 4.3764C11.915 4.45881 12.0111 4.57594 12.0679 4.71299C12.1247 4.85003 12.1395 5.00083 12.1106 5.14632C12.0816 5.2918 12.0102 5.42544 11.9053 5.53033C11.8004 5.63522 11.6668 5.70665 11.5213 5.73559C11.3758 5.76453 11.225 5.74968 11.088 5.69291C10.9509 5.63614 10.8338 5.54001 10.7514 5.41668C10.669 5.29334 10.625 5.14834 10.625 5C10.625 4.80109 10.704 4.61032 10.8447 4.46967C10.9853 4.32902 11.1761 4.25 11.375 4.25ZM8.375 8C8.52334 8 8.66834 8.04399 8.79168 8.1264C8.91501 8.20881 9.01114 8.32594 9.06791 8.46299C9.12467 8.60003 9.13953 8.75083 9.11059 8.89632C9.08165 9.0418 9.01022 9.17544 8.90533 9.28033C8.80044 9.38522 8.6668 9.45665 8.52132 9.48559C8.37583 9.51453 8.22503 9.49968 8.08799 9.44291C7.95094 9.38614 7.83381 9.29002 7.7514 9.16668C7.66899 9.04334 7.625 8.89834 7.625 8.75C7.625 8.55109 7.70402 8.36032 7.84467 8.21967C7.98532 8.07902 8.17609 8 8.375 8ZM0.875 4.25H8.375C8.57391 4.25 8.76468 4.32902 8.90533 4.46967C9.04598 4.61032 9.125 4.80109 9.125 5C9.125 5.19891 9.04598 5.38968 8.90533 5.53033C8.76468 5.67098 8.57391 5.75 8.375 5.75H0.875C0.676087 5.75 0.485322 5.67098 0.344669 5.53033C0.204017 5.38968 0.125 5.19891 0.125 5C0.125 4.80109 0.204017 4.61032 0.344669 4.46967C0.485322 4.32902 0.676087 4.25 0.875 4.25ZM0.875 8H5.375C5.57391 8 5.76468 8.07902 5.90533 8.21967C6.04598 8.36032 6.125 8.55109 6.125 8.75C6.125 8.94891 6.04598 9.13968 5.90533 9.28033C5.76468 9.42098 5.57391 9.5 5.375 9.5H0.875C0.676087 9.5 0.485322 9.42098 0.344669 9.28033C0.204017 9.13968 0.125 8.94891 0.125 8.75C0.125 8.55109 0.204017 8.36032 0.344669 8.21967C0.485322 8.07902 0.676087 8 0.875 8Z" fill="currentColor"></path></svg><div className="text-grey-200 text-xs font-semibold hidden md:inline-flex">Filter</div><div className="hidden md:flex min-w-[18px] h-[18px] px-1 text-xs rounded bg-green-700 text-grey-50 items-center justify-center">9</div></button></div>
            <div className="flex flex-col w-full md:mb-2 no-scrollbar flex-1 md:flex-initial min-h-0 ">
                <div className="flex flex-col md:gap-y-3 h-[calc(100vh_-_188px)] no-scrollbar overflow-scroll explore-single-item">
                    {pools?.map(pool => <PumpCard key={pool?.Mint} {...pool} />)}
                </div>
            </div>
        </div>
    )
}
