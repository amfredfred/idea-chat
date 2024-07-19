export interface ITokenItemBlock {
  index: number,
  token: number
}

export default function TokenItemBlock(props: ITokenItemBlock) {

  console.log({ props })

  return (
    <div>TokenItemBlock = {String(props)}</div>
  )
}
