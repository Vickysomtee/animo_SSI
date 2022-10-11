import { Agent } from "@aries-framework/core";

type attribute = {
  name: string,
  value: string
}

const issueCredential = async (issuer: Agent, credentialDefinitionId: string, connectionId: string, attributes: attribute[]) =>
  issuer.credentials.offerCredential({
    protocolVersion: 'v1',
    connectionId,
    credentialFormats: {
      indy: {
        credentialDefinitionId,
        attributes,
      },
    },
  });

  export default issueCredential;