// get notes by user id
import database from '../../database';

export async function getNotesByUserId(userId: string) {
  try {
    const notes = await database('notes').select().where({ user_id: userId });
    if (!notes) {
      throw {
        detail: 'Notes not found',
        message: 'Notes not found',
        code: '404',
      };
    }

    return notes;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}

export async function getNoteById(noteId: string) {
  try {
    const note = await database('notes').select().where({ id: noteId });
    if (!note) {
      throw {
        detail: 'Note not found',
        message: 'Note not found',
        code: '404',
      };
    }

    return note;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}
