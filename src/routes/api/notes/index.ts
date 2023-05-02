import { FastifyInstance } from 'fastify';
import verifyToken from '../../../middleware/verifyToken';
import {
  NoteByIdController,
  userNotesController,
} from '../../../controllers/notesControllers/UserNote';
import createNoteController from '../../../controllers/notesControllers/CreateNote';
import deleteNoteController from '../../../controllers/notesControllers/DeleteNote';

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
    handler: deleteNoteController,
  });

  done();
}
