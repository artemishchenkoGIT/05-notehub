import { useMutationNotes } from '../../hooks/useMutationNotes';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import Loader from '../Loader/Loader';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const deleteNoteMutation = useMutationNotes(
    deleteNote,
    'deleted successfully'
  );

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <>
      {deleteNoteMutation.isPending && <Loader />}
      {notes && notes.length > 0 ? (
        <ul className={css.list}>
          {notes.map(({ id, title, content, tag }) => (
            <li className={css.listItem} key={id}>
              <h2 className={css.title}>{title}</h2>
              <p className={css.content}>{content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{tag}</span>
                <button className={css.button} onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Don`t have any notes</p>
      )}
    </>
  );
}

export default NoteList;
