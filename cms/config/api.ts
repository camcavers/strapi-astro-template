export default ({ env }) => ({
  responses: {
    privateAttributes: ['createdBy', 'updatedBy'],
  },
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  cors: {
    enabled: true,
    origin: env.array('CORS_ORIGIN', ['http://localhost:4321']),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
});