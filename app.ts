import express, { Express, Request, Response, NextFunction } from "express";

import initializeAgent from "./src/services/Agent";
import createNewInvitation from "./src/utils/createInvitation";
import registerSchema from "./src/schemas/AnimoID";
import { animoAttributes } from "./src/attributes/animoID";
import issueCredential from "./src/utils/issueCredentials";
import registerCredentialDefinition from "./src/utils/credentialDefinition";

const app: Express = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello there!");
  next();
});

const issueCredentials = async () => {
  const agent = await initializeAgent();

  // Creates invitation and auto connect
  const { outOfBandRecord, invitationUrl } = await createNewInvitation(
    agent
  );

  console.log(outOfBandRecord)
  console.log(invitationUrl)

  const schema = await registerSchema(agent);

  const credentialDefinition = await registerCredentialDefinition(
    agent,
    schema
  );

  await issueCredential(agent, credentialDefinition.id, outOfBandRecord.id,  animoAttributes)
};

app.listen(3001, () => {
  console.log("Listening on port 3000");
});
