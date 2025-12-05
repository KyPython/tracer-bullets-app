import request from 'supertest';
import express from 'express';
import cors from 'cors';
import tasksRouter from '../routes/tasks';

// Create a test app
const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

describe('Tasks API Integration Test', () => {
  it('should create a task and then retrieve it', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      })
      .expect(201);

    expect(createResponse.body).toHaveProperty('id');
    expect(createResponse.body.title).toBe('Test Task');
    expect(createResponse.body.description).toBe('This is a test task');

    const taskId = createResponse.body.id;

    // Retrieve all tasks
    const getResponse = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(Array.isArray(getResponse.body)).toBe(true);
    const createdTask = getResponse.body.find((t: any) => t.id === taskId);
    expect(createdTask).toBeDefined();
    expect(createdTask.title).toBe('Test Task');
  });

  it('should reject task creation without title', async () => {
    await request(app)
      .post('/api/tasks')
      .send({
        description: 'Task without title',
      })
      .expect(400);
  });
});

