export interface Task {
    id: number;
    name: string;
    parentId: number | null;
    status: 'IN_PROGRESS' | 'DONE' | 'COMPLETE';
    children?: Task[];
  }