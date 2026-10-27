export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tag: NoteTag;
}

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
