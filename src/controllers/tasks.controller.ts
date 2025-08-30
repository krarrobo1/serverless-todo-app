import { Body, Get, Post, Route, Response, Tags } from 'tsoa';
import { CreateTaskRequest, Task } from '../types/tasks';

@Route('api/tasks')
@Tags('Tasks')
export class TasksController {
  @Get('/')
  public async getTasks(): Promise<Task[]> {
    return [
      {
        title: 'Walk the dog',
        description: 'Take Rex to the park',
        status: 'pending'
      }
    ];
  }

  @Post('/')
  @Response(400, 'Bad Request')
  public async createTask(@Body() requestBody: CreateTaskRequest): Promise<Task> {
    if (!requestBody.title || !requestBody.description) {
      throw new Error('Title and description are required');
    }
    
    return {
      ...requestBody,
      status: 'pending'
    };
  }
}