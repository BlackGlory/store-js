import { JsonSchemaManager } from './json-schema-manager'
import { BlacklistManager } from './blacklist-manager'
import { WhitelistManager } from './whitelist-manager'
import { TokenPolicyManager } from './token-policy-manager'
import { TokenManager } from './token-manager'
import { RevisionPolicyManager } from './revision-policy-manager'

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
