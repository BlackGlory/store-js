import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { IStoreManagerRequestOptions, StoreManagerBase } from './utils'

interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
  delete: boolean
}

export class TokenClient extends StoreManagerBase {
  async getNamespaces(options: IStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/store-with-tokens')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(
    namespace: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<ITokenInfo[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  async addWriteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens/${token}/write`)
    )

    await fetch(req).then(ok)
  }

  async removeWriteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens/${token}/write`)
    )

    await fetch(req).then(ok)
  }

  async addReadToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens/${token}/read`)
    )

    await fetch(req).then(ok)
  }

  async removeReadToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens/${token}/read`)
    )

    await fetch(req).then(ok)
  }

  async addDeleteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens/${token}/delete`)
    )

    await fetch(req).then(ok)
  }

  async removeDeleteToken(
    namespace: string
  , token: string
  , options: IStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/store/${namespace}/tokens/${token}/delete`)
    )

    await fetch(req).then(ok)
  }
}
