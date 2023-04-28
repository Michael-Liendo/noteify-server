import { FastifyInstance } from 'fastify';
import verifyToken from '../../../middleware/verifyToken';
import userNotesController from '../../../controllers/notesControllers/userNotes';
import { NoteByIdController } from '../../../controllers/notesControllers/note';
import createNoteController from '../../../controllers/notesControllers/CreateNote';

export default function notes(fastify: FastifyInstance, options, done) {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: verifyToken,
    handler: userNotesController,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    preHandler: verifyToken,
    handler: NoteByIdController,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: verifyToken,
    handler: createNoteController,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    preHandler: verifyToken,
    handler: async (request, reply) => {
      // todo: update note by id
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: verifyToken,
    handler: async (request, reply) => {
      // todo: delete note by id
    },
  });

  done();
}
