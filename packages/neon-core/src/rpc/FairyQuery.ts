import Query, { InvokeResult, JsonRpcParams, QueryLike } from "./Query";
// TODO: FairyInvokeResult extends InvokeResult: system & network fee, etc.
import { Signer, SignerJson } from "../tx/components/Signer";
import { ContractParam, ContractParamJson } from "../sc/ContractParam";
import { HexString } from "../u";

export interface sessionStringToBoolean {
  [session: string]: boolean;
}

export interface sessionStringToString {
  [session: string]: string;
}

export interface sessionStringToBigint {
  [session: string]: bigint;
}

export default class FairyQuery<
  TParams extends JsonRpcParams,
  TResponse
> extends Query<TParams, TResponse> {
  public constructor(req: Partial<QueryLike<TParams>>) {
    super(req);
  }

  public static invokeFunctionWithSession(
    fairySession: string,
    relay: boolean,
    scriptHash: string,
    operation: string,
    params: unknown[] = [],
    signers: (Signer | SignerJson)[] = []
  ): Query<
    [string, boolean, string, string, unknown[], SignerJson[]],
    InvokeResult
  > {
    return new Query({
      method: "invokefunctionwithsession",
      params: [
        fairySession,
        relay,
        scriptHash,
        operation,
        params.map((p) => (p instanceof ContractParam ? p.toJson() : p)),
        signers.map((s) => (s instanceof Signer ? s.toJson() : s)),
      ],
    });
  }

  public static invokeManyWithSession(
    fairySession: string,
    relay: boolean,
    callArguments: [string, string, unknown[]][],
    signers: (Signer | SignerJson)[] = []
  ): Query<
    [
      string,
      boolean,
      [string, string, unknown[] | ContractParamJson][],
      SignerJson[]
    ],
    InvokeResult
  > {
    const processedArguments: [
      string,
      string,
      unknown[] | ContractParamJson
    ][] = [];
    for (const [scripthash, operation, params] of callArguments) {
      processedArguments.push([
        scripthash,
        operation,
        params instanceof ContractParam ? params.toJson() : params,
      ]);
    }
    return new Query({
      method: "invokemanywithsession",
      params: [
        fairySession,
        relay,
        processedArguments,
        signers.map((s) => (s instanceof Signer ? s.toJson() : s)),
      ],
    });
  }

  public static invokeScriptWithSession(
    fairySession: string,
    relay: boolean,
    script: string | HexString,
    signers: (Signer | SignerJson)[] = []
  ): Query<[string, boolean, string, SignerJson[]], InvokeResult> {
    return new Query({
      method: "invokescriptwithsession",
      params: [
        fairySession,
        relay,
        script instanceof HexString ? script.toBase64() : script,
        signers.map((s) => (s instanceof Signer ? s.toJson() : s)),
      ],
    });
  }

  public static newSnapshotsFromCurrentSystem(
    fairySessions: string[]
  ): Query<string[], sessionStringToBoolean> {
    return new Query({
      method: "newsnapshotsfromcurrentsystem",
      params: fairySessions,
    });
  }

  public static deleteSnapshots(
    fairySessions: string[]
  ): Query<string[], sessionStringToBoolean> {
    return new Query({
      method: "deletesnapshots",
      params: fairySessions,
    });
  }

  public static listSnapshots(): Query<[], Array<string>> {
    return new Query({
      method: "listsnapshots",
    });
  }

  public static renameSnapshot(
    old_name: string,
    new_name: string
  ): Query<string[], sessionStringToString> {
    return new Query({
      method: "renamesnapshot",
      params: [old_name, new_name],
    });
  }

  public static copySnapshot(
    old_name: string,
    new_name: string
  ): Query<string[], sessionStringToString> {
    return new Query({
      method: "copysnapshot",
      params: [old_name, new_name],
    });
  }

  public static setSnapshotTimestamp(
    fairySession: string,
    timestamp_ms: bigint
  ): Query<[string, bigint], sessionStringToBigint> {
    return new Query({
      method: "setsnapshottimestamp",
      params: [fairySession, timestamp_ms],
    });
  }

  public static getSnapshotTimestamp(
    fairySessions: string[]
  ): Query<string[], sessionStringToBigint> {
    return new Query({
      method: "setsnapshottimestamp",
      params: fairySessions,
    });
  }

  public static virtualDeploy(
    fairySession: string,
    nef: Buffer,
    manifest: string,
    signers: (Signer | SignerJson)[]
  ): Query<[string, string, string, SignerJson[]], InvokeResult> {
    return new Query({
      method: "virtualdeploy",
      params: [
        fairySession,
        nef.toString("base64"),
        manifest,
        signers.map((s) => (s instanceof Signer ? s.toJson() : s)),
      ],
    });
  }

  // TODO: debugger features
}
