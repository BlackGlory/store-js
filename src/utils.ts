import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth, header } from 'extra-request/transformers/index.js'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import type { IStoreManagerOptions } from './store-manager'

export interface IStoreManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export const expectedVersion = '0.3.6'

export class StoreManagerBase {
  constructor(private options: IStoreManagerOptions) {}

  protected getCommonTransformers(
    options: IStoreManagerRequestOptions
  ): IHTTPOptionsTransformer[] {
    return [
      url(this.options.server)
    , bearerAuth(this.options.adminPassword)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive ?? false)
    , header('Accept-Version', expectedVersion)
    ]
  }
}
