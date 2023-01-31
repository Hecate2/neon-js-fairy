import FairyQuery from "../../src/rpc/FairyQuery";
import Query from "../../src/rpc/Query";
import { FairyRPCClient } from "../../src/rpc/FairyRPCClient";
import { Signer } from "../../src/tx";
import jestExpect from "jest-circus/build/legacy-code-todo-rewrite/jestExpect";

describe("fairy", () => {
  const neoScripthash = "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5";
  const signer = new Signer({
    account: "0xb1983fa2479a0c8e2beae032d2df564b5451b7a5",
    scopes: "Global",
  }).toJson();

  test("invokeFunctionWithSession", async () => {
    const client = new FairyRPCClient("http://localhost:16868");
    const result = await client.invokeFunctionWithSession(
      "neon-js-fairy-test",
      true,
      neoScripthash,
      "totalSupply",
      [],
      [signer]
    )
    expect(result.stack).toEqual([{"type": "Integer", "value": "100000000"}]);
  });
});
