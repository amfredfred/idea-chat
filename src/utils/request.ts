import { useEffect, useState } from "react"

export const fetcher = (url: URL | RequestInfo, init?: RequestInit) => fetch(url, init).then((res) => res.json())

type Params = Record<string, string>
export async function get(url: string, params?: Params) {
  if (params) {
    const qs = new URLSearchParams(params)
    url += url.includes("?") ? "&" : "?"
    url += qs.toString()
  }
  const res = await fetch(url)
  return res.json()
}

export async function post(url: string, data: object) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  return res.json()
}

export async function gql<T>(node: string, query: string): Promise<T> {
  const data = await post(node, { query })
  return data
}