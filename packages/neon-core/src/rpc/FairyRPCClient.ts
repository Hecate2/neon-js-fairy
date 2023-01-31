import RPCClient from "./RPCClient";
import { FairyRpcMixin } from "./clients";

export class FairyRPCClient extends FairyRpcMixin(RPCClient) {
  public constructor(net: string) {
    super(net);
  }
}
