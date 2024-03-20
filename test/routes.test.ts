import request from 'supertest'
import app from '../src/app'
// @ts-ignore
import { createToDoItem, getAllToDoItems, getToDoItem, removeAllToDoItems } from './units/databaseUtil'

const apiBase = '/api'

describe('Todo API', () => {
  afterEach(async () => {
    await removeAllToDoItems()
  })

  it('GET /todos - success', async () => {
    await createToDoItem({ title: 'Test Todo', completed: 0 })
    await createToDoItem({ title: 'Test Todo 2', completed: 1 })

    const response = await request(app).get(`${apiBase}/todos`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data[0]).toMatchObject({
      title: 'Test Todo',
      completed: 0,
    })
    expect(response.body.data[1]).toMatchObject({
      title: 'Test Todo 2',
      completed: 1,
    })
  })

  it('POST /todos - success', async () => {
    const all = await getAllToDoItems()

    expect(all.length).toBe(0)

    const response = await request(app).post(`${apiBase}/todos`).send({ title: 'New Todo', completed: false })

    expect(response.statusCode).toBe(201)

    expect(response.body).toHaveProperty('message', 'A new todo has been added')

    expect(response.body).toHaveProperty('id')

    const allAfter = await getAllToDoItems()

    expect(allAfter.length).toBe(1)
    expect(allAfter[0]).toMatchObject({
      title: 'New Todo',
      completed: 0,
    })
  })

  it('PATCH /todos/:id - success', async () => {
    const todo = await createToDoItem({ title: 'Test Todo', completed: 0 })

    const response = await request(app)
      .patch(`${apiBase}/todos/${todo.id}`)
      .send({ title: 'New Title', completed: true })

    expect(response.statusCode).toBe(200)

    const updatedTodo = await getToDoItem(todo.id)

    expect(updatedTodo).toMatchObject({
      title: 'New Title',
      completed: 1,
    })
  })
})
