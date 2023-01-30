import { JsonSchemaManager } from './json-schema-manager.js'
import { BlacklistManager } from './blacklist-manager.js'
import { WhitelistManager } from './whitelist-manager.js'
import { TokenPolicyManager } from './token-policy-manager.js'
import { TokenManager } from './token-manager.js'
import { RevisionPolicyManager } from './revision-policy-manager.js'

export interface IStoreManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

export class StoreManager {
  constructor(private options: IStoreManagerOptions) {}

  JsonSchema = new JsonSchemaManager(this.options)
  Blacklist = new BlacklistManager(this.options)
  Whitelist = new WhitelistManager(this.options)
  TokenPolicy = new TokenPolicyManager(this.options)
  Token = new TokenManager(this.options)
  RevisionPolicy = new RevisionPolicyManager(this.options)
}
