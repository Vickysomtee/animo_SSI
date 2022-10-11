import express, { Express, Request, Response, NextFunction } from "express";

import initializeAgent from "./src/services/Agent";
import createNewInvitation from "./src/utils/createInvitation";
import registerSchema from "./src/schemas/AnimoID";
import { animoAttributes } from "./src/attributes/animoID";
import issueCredential from "./src/utils/issueCredentials";
import registerCredentialDefinition from "./src/utils/credentialDefinition";

const app: Express = express();

app.use("/health", (_, res) => res.sendStatus(200));
app.use((req, res) => {
  return res
    .status(404)
    .json({
      status: "error",
      message: `${req.method} ${req.originalUrl} not found`,
    });
});

const issueCredentials = async () => {
  const agent = await initializeAgent();

  // Creates invitation url
  const { outOfBandRecord, invitationUrl } = await createNewInvitation(agent);

  console.log(outOfBandRecord);
  console.log(invitationUrl);

  const schema = await registerSchema(agent);

  const credentialDefinition = await registerCredentialDefinition(
    agent,
    schema
  );

  await issueCredential(
    agent,
    credentialDefinition.id,
    outOfBandRecord.id,
    animoAttributes
  );
};

issueCredentials();

app.listen(3001, () => {
  console.log("Listening on port 3000");
});
