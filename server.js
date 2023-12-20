/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "service-account-file.json")
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

const app = initializeApp();


const fastify = require("fastify")({
  logger: false,
});


fastify.get("/", function (request, reply){
  reply.code(200).send("ok")
})

fastify.post("/sendFCM", async function (request, reply) {
  const {message} = request.body
  
  await getMessaging(app).send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    reply.code(200)
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    reply.code(500)
  });
  
  return 

});


fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
