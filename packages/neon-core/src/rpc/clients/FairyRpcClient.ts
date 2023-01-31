import FairyQuery, {
  sessionStringToBoolean,
  sessionStringToBigint,
  sessionStringToString,
} from "../FairyQuery";
import { RpcDispatcher, RpcDispatcherMixin } from "./RpcDispatcher";
import { Signer, SignerJson } from "../../tx/components/Signer";
import { InvokeResult } from "../Query";
import { HexString } from "../../u";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function FairyRpcMixin<TBase extends RpcDispatcherMixin>(base: TBase) {
  return class FairyRpcInterface extends base {
    public async invokeFunctionWithSession(
      fairySession: string,
      relay: boolean,
      scriptHash: string,
      operation: string,
      params: unknown[] = [],
      signers: (Signer | SignerJson)[] = []
    ): Promise<InvokeResult> {
      return this.execute(
        FairyQuery.invokeFunctionWithSession(
          fairySession,
          relay,
          scriptHash,
          operation,
          params,
          signers
        )
      );
    }

    public async invokeManyWithSession(
      fairySession: string,
      relay: boolean,
      callArguments: [string, string, unknown[]][],
      signers: (Signer | SignerJson)[] = []
    ): Promise<InvokeResult> {
      return this.execute(
        FairyQuery.invokeManyWithSession(
          fairySession,
          relay,
          callArguments,
          signers
        )
      );
    }

    public async invokeScriptWithSession(
      fairySession: string,
      relay: boolean,
      script: string | HexString,
      signers: (Signer | SignerJson)[] = []
    ): Promise<InvokeResult> {
      return this.execute(
        FairyQuery.invokeScriptWithSession(fairySession, relay, script, signers)
      );
    }

    public async newSnapshotsFromCurrentSystem(
      fairySessions: string[]
    ): Promise<sessionStringToBoolean> {
      return this.execute(
        FairyQuery.newSnapshotsFromCurrentSystem(fairySessions)
      );
    }

    public async deleteSnapshots(
      fairySessions: string[]
    ): Promise<sessionStringToBoolean> {
      return this.execute(FairyQuery.deleteSnapshots(fairySessions));
    }

    public async listSnapshots(): Promise<Array<string>> {
      return this.execute(FairyQuery.listSnapshots());
    }

    public async renameSnapshot(
      old_name: string,
      new_name: string
    ): Promise<sessionStringToString> {
      return this.execute(FairyQuery.renameSnapshot(old_name, new_name));
    }

    public async copySnapshot(
      old_name: string,
      new_name: string
    ): Promise<sessionStringToString> {
      return this.execute(FairyQuery.copySnapshot(old_name, new_name));
    }

    public async setSnapshotTimestamp(
      fairySession: string,
      timestamp_ms: bigint
    ): Promise<sessionStringToBigint> {
      return this.execute(
        FairyQuery.setSnapshotTimestamp(fairySession, timestamp_ms)
      );
    }

    public async getSnapshotTimestamp(
      fairySessions: string[]
    ): Promise<sessionStringToBigint> {
      return this.execute(FairyQuery.getSnapshotTimestamp(fairySessions));
    }

    public async virtualDeploy(
      fairySession: string,
      nef: Buffer,
      manifest: string,
      signers: (Signer | SignerJson)[]
    ): Promise<InvokeResult> {
      return this.execute(
        FairyQuery.virtualDeploy(fairySession, nef, manifest, signers)
      );
    }
  };
}

export class FairyRpcClient extends FairyRpcMixin(RpcDispatcher) {
  public get [Symbol.toStringTag](): string {
    return `FairyRpcClient(${this.url})`;
  }
}
