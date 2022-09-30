import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth, header } from 'extra-request/transformers/index.js'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import type { IStoreManagerOptions } from './store-manager'
import { Falsy } from 'justypes'

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
  ): Array<IHTTPOptionsTransformer | Falsy> {
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
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }
}
