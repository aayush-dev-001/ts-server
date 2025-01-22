# Node.js TypeScript Production Server

A production-ready Node.js server built with TypeScript, featuring clustering, error handling, logging, and security best practices.

## Features

- **TypeScript Support** - Full TypeScript implementation
- **Clustering** - Multi-core CPU utilization
- **Error Handling** - Centralized error handling with custom error classes
- **Logging** - Advanced logging system with Winston
- **Security** - Helmet, rate limiting, and CORS configured
- **Environment Management** - Strong environment variable validation
- **API Versioning** - Built-in API versioning support
- **Health Checks** - Ready-to-use health check endpoint
- **Request Validation** - Input validation middleware
- **Production Ready** - Includes compression, graceful shutdown, and more

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- TypeScript 5.x

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aayush-dev-001/ts-server.git
cd ts-server
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ts_db
NODE_ENV=development
MAX_WORKERS=4
API_VERSION=v1
```

## Development

Start the development server:

```bash
npm run dev
```

The server will restart automatically on file changes.

## Production

Build and start the production server:

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middlewares
├── routes/         # API routes
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## API Documentation

### Health Check

```
GET /health
```

Returns server health status

### API Endpoints

All API endpoints are prefixed with `/api/v1/`

## Error Handling

The application includes a centralized error handling system:

```typescript
throw new AppError("Resource not found", 404);
```

Error Response Format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here",
    "code": 404
  }
}
```

## Logging

Logs are stored in the `logs` directory:

- `error.log`: Error level logs
- `combined.log`: All logs

Console output is enabled in development mode.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run typecheck` - Check types

## Environment Variables

| Variable    | Description                                 | Default         |
| ----------- | ------------------------------------------- | --------------- |
| PORT        | Server port                                 | 3000            |
| DB_HOST     | Database host                               | localhost       |
| DB_USER     | Database user                               | root            |
| DB_PASSWORD | Database password                           |                 |
| DB_NAME     | Database name                               | ts_db           |
| NODE_ENV    | Environment (development, test, production) | development     |
| MAX_WORKERS | Number of worker processes                  | 0 (auto-detect) |
| API_VERSION | API version                                 | v1              |

## Security

- Uses Helmet for secure headers
- Rate limiting enabled
- CORS configured
- Request size limits
- Input validation

## Performance

- Compression enabled
- Clustering for multi-core systems
- Response caching support
- Request timeout handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Aayush Kumar

- GitHub: [@aayush-dev-001](https://github.com/aayush-dev-001)

## Support

For support, email support@your-domain.com or create an issue in the GitHub repository.
