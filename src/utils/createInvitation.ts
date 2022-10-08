import { Agent } from "@aries-framework/core";

const createNewInvitation = async (agent: Agent) => {
  const outOfBandRecord = await agent.oob.createInvitation()
  agent.connections.findAllByOutOfBandId
  return {
    invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({ domain: 'https://example.org' }),
    outOfBandRecord,
  }
}

export default createNewInvitation;