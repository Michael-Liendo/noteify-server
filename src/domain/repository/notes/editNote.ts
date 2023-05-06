import database from '../../database';

export default async function editNote(
  id: string,
  userId: string,
  title: string,
  content: string
) {
  try {
    const note = await database('notes')
      .where({ id, user_id: userId })
      .update({ title, content });

    if (!note) {
      throw {
        detail: 'Note not found',
        message: 'Note not found',
        code: '404',
      };
    }

    return note;
  } catch (error) {
    throw new Error(error);
  }
}
