export type Priority = 'high' | 'medium' | 'low';

export type NoteProps = {
    id?: number;
    text: string;
    priority?: Priority;
  }

export type NoteType = {
  id: string;
  text: string;
  priority: Priority;
}