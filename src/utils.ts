import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth } from 'extra-request/transformers/index.js'
import { timeoutSignal, raceAbortSignals } from 'extra-promise'
import type { IStoreManagerOptions } from './store-manager'

export interface IStoreManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

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
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }
}
