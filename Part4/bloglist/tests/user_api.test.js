/* eslint-disable @stylistic/js/linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const { usersInDB } = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password414', 10)
    const user = new User({ username: 'Ridwan414', passwordHash })

    await user.save()
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    const usernames = usersAtEnd.map(u => u.username)
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    expect(usernames).toContain(newUser.username)

  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'Ridwan414',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    expect(result.body.error).toContain('expected `username` to be unique')
    expect(usersAtEnd.length).toBe(usersAtStart.length)

  })
  test('creation fails with proper statuscode and message if username is less than 3', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'R',
      name: 'Superuser',
      password: '6676',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    expect(result.body.error).toContain('Path `username` (`R`) is shorter than the minimum allowed length (3).')
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
  test('creation fails with proper statuscode and message if password is less than 3', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'Rttggg',
      name: 'Superuser',
      password: '66',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    expect(result.body.error).toContain('Password is too short')
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})