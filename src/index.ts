import Fastify from 'fastify';
const fastify = Fastify();

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
