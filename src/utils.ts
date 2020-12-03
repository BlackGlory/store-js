import { Json } from '@blackglory/types'
import { fetch, Headers } from 'cross-fetch'
import { fromCode } from '@blackglory/http-status'

interface Querystring {
  [name: string]: string
}

export async function head(
  { baseUrl, pathname, querystring, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const headers = new Headers()
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)

  const res = await fetch(url, {
    method: 'HEAD'
  , headers
  , signal
  })
  checkHTTPStatus(res)
  return res
}

export async function get(
  { baseUrl, pathname, querystring, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const headers = new Headers()
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)

  const res = await fetch(url, { headers, signal })
  checkHTTPStatus(res)
  return res
}

export async function postText(
  { baseUrl, pathname, querystring, body, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    body: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const res = await fetch(url, {
    method: 'POST'
  , body
  , signal
  })
  checkHTTPStatus(res)
  return res
}

export async function postJson(
  { baseUrl, pathname, querystring, json, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    json: Json
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)

  const body = JSON.stringify(json)
  const res = await fetch(url, {
    method: 'POST'
  , headers
  , body
  , signal
  })
  checkHTTPStatus(res)
  return res
}

export async function del(
  { baseUrl, pathname, querystring, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)

  const res = await fetch(url, {
    method: 'DELETE'
  , headers
  , signal
  })
  checkHTTPStatus(res)
  return res
}

export async function put(
  { baseUrl, pathname, querystring, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const headers = new Headers()
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)

  const res = await fetch(url, {
    method: 'PUT'
  , headers
  , signal
  })
  checkHTTPStatus(res)
  return res
}

export async function putJson(
  { baseUrl, pathname, querystring, json, adminPassword, signal }: {
    baseUrl: string
    pathname: string
    querystring?: Querystring
    json: Json
    adminPassword?: string
    signal?: AbortSignal
  }
): Promise<Response> {
  const url = join(baseUrl, pathname, querystring)

  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (adminPassword) headers.append('Authorization', `Bearer ${adminPassword}`)

  const res = await fetch(url, {
    method: 'PUT'
  , headers
  , body: JSON.stringify(json)
  , signal
  })
  checkHTTPStatus(res)
  return res
}

function join(baseUrl: string, pathname: string, querystring: Querystring = {}): string {
  const url = new URL(pathname, baseUrl)
  for (const [name, value] of Object.entries(querystring)) {
    url.searchParams.append(name, value)
  }
  return url.href
}

function checkHTTPStatus(res: Response) {
  if (!res.ok) throw fromCode(res.status)
}
