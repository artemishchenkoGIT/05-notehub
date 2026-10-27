import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useFetchNotes } from '../../hooks/useFetchNotes';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [query, setQuery] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, error, isSuccess } = useFetchNotes(
    query,
    page
  );

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, data]);

  const totalPages = data?.totalPages ?? 0;

  const updateQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <Toaster />
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <header className={css.toolbar}>
        <SearchBox onQueryChange={updateQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isError && <ErrorMessage error={error} />}
    </div>
  );
}

export default App;
