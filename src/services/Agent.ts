import {
  Agent,
  InitConfig,
  AutoAcceptCredential,
  WsOutboundTransport,
  HttpOutboundTransport,
} from "@aries-framework/core";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";

const getGenesisTransaction = async (url: string) => {
  const response = await fetch(url)
  return await response.text()
}

const initializeIssuerAgent = async () => {
  const genesisTransactionsBCovrinTestNet = await getGenesisTransaction('http://test.bcovrin.vonx.io/genesis')

  const config: InitConfig = {
    label: 'Anino Connect',
    walletConfig: {
      id: 'animo',
      key: '3hMxFiM84nm5Xl8wXk9nurcBF0usaT4k',
    },
    publicDidSeed: '3hMxFiM84nm5Xl8wXk9nurcBF0usaT4k',
    indyLedgers: [
      {
        id: 'bcovrin-test-net',
        isProduction: false,
        genesisTransactions: genesisTransactionsBCovrinTestNet,
      },
    ],
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptConnections: true,
    endpoints: ['http://localhost:3001'],
  }
  // A new instance of an agent is created here
  const agent = new Agent(config, agentDependencies)

  agent.registerOutboundTransport(new WsOutboundTransport())

  agent.registerOutboundTransport(new HttpOutboundTransport())

  agent.registerInboundTransport(new HttpInboundTransport({ port: 3001 }))

  await agent.initialize()
  return agent
}

export default initializeIssuerAgent;