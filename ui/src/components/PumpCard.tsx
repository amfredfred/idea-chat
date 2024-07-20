export default function PumpCard(props:any) {

  console.log(props?.Name)

  return (
    <div className="pump-card">
      <a className="w-full h-full absolute inset-0 z-[1]" href="/terminal?chainId=1399811149&amp;address=2FxuYGVZRoUXg51zffnYxymqerFAuSEQabAsLzTFpump">
        {props?.Name}
      </a>
    </div>
  )
}


