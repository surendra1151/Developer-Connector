import { rest } from 'msw';

export const handlers = [
  rest.post('/signin', (req, res, ctx) => {
    const { email, password } = req.body;

    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'kishore',
        email,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0M2M5NTM0NGRjZTk0ZjRmN2QyYTMyIn0sImlhdCI6MTYzMTgzMjQwMywiZXhwIjoxNjMxODY4NDAzfQ.3AaqjQkU9vuEE5rMJsrIWA9QX4XCX6mY-BBQyy0e-3A',
      })
    );
  }),
];
