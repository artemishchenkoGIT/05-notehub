import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import Loader from '../Loader/Loader';
import css from './NoteList.module.css';
import toast from 'react-hot-toast';
import { showError } from '../../utils/error';

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: ({ title }) => {
      toast.success(`${title} deleted successfully`);

      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
    onError: (error: Error) => {
      showError(error);
    },
  });

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
