import { Agent } from "@aries-framework/core";
import { Schema } from "indy-sdk";

const registerCredentialDefinition = async (issuer: Agent, schema: Schema) =>
  issuer.ledger.registerCredentialDefinition({
    schema,
    supportRevocation: false,
    tag: "default",
  });

  export default registerCredentialDefinition;
