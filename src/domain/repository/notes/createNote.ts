import database from '../../database';

export default async function createNote(
  user_id: string,
  title: string,
  content: string
) {
  try {
    const [note] = await database('notes')
      .insert({
        user_id,
        title,
        content,
      })
      .returning('*');

    return note;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}
