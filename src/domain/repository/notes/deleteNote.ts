// delete note by id repository
import database from '../../database';

export async function deleteNoteById(noteId: string, userId: string) {
  try {
    const note = await database('notes')
      .where({ id: noteId, user_id: userId })
      .del()
      .returning('*');
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
