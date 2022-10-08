import { Agent } from "@aries-framework/core";

const registerSchema = async (issuer: Agent) =>
  issuer.ledger.registerSchema({
    attributes: ["name", "age", "role"],
    name: "Identity",
    version: "1.0",
  });


export default registerSchema;