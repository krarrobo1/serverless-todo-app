export interface CreateTaskRequest {
    title: string;
    description: string;
}

export interface Task extends CreateTaskRequest {
    status: 'pending' | 'completed';
}