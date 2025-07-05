# CSV BullMQ Kafka Demo

A Node.js application demonstrating the integration of CSV file processing with BullMQ (Redis-based queue) and Apache Kafka for message streaming. This project showcases how to upload CSV files, process them asynchronously using job queues, and stream the data to Kafka topics.

## 🚀 Features

- **File Upload**: Upload CSV files via REST API endpoint
- **Asynchronous Processing**: Use BullMQ for background job processing
- **Message Streaming**: Stream processed CSV data to Apache Kafka
- **Real-time Monitoring**: Monitor queues with RedisInsight and Kafka with Kafka UI
- **Containerized Setup**: Complete Docker Compose setup for all services

## 🏗️ Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│   Express   │───▶│   BullMQ    │───▶│    Kafka    │
│             │    │   Server    │    │   Worker    │    │   Producer  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                  │                    │
                          ▼                  ▼                    ▼
                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                   │   Uploads   │    │    Redis    │    │    Kafka    │
                   │   Folder    │    │    Queue    │    │   Consumer  │
                   └─────────────┘    └─────────────┘    └─────────────┘
```

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Queue Management**: BullMQ, Redis
- **Message Streaming**: Apache Kafka (KafkaJS)
- **File Processing**: CSV Parser, Multer
- **Infrastructure**: Docker, Docker Compose
- **Monitoring**: RedisInsight, Kafka UI

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd csv_bullmq_kafka_demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Infrastructure Services

```bash
docker-compose up -d
```

This will start:
- **Redis** (port 6379) with RedisInsight UI (port 8001)
- **Kafka** (port 29092 for external connections)
- **Kafka UI** (port 8080)

### 4. Verify Services

- Redis: `http://localhost:8001` (RedisInsight)
- Kafka UI: `http://localhost:8080`

## 🚀 Usage

### 1. Start the Application

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 2. Start Kafka Consumer (Optional)

In a separate terminal:

```bash
npm run consume
```

### 3. Upload CSV File

Use curl or any HTTP client to upload a CSV file:

```bash
curl -X POST -F "file=@your-file.csv" http://localhost:3000/upload
```

Or use a tool like Postman:
- Method: POST
- URL: `http://localhost:3000/upload`
- Body: form-data with key `file` and your CSV file

### 4. Monitor Processing

- **BullMQ Jobs**: Check RedisInsight at `http://localhost:8001`
- **Kafka Messages**: Check Kafka UI at `http://localhost:8080`
- **Console Logs**: Watch the terminal for processing logs

## 📁 Project Structure

```
csv_bullmq_kafka_demo/
├── bullmq/
│   ├── queue.js          # BullMQ queue configuration
│   └── worker.js         # Background job worker
├── kafka/
│   ├── consumer.js       # Kafka message consumer
│   └── producer.js       # Kafka message producer
├── lib/
│   ├── kafkaClient.js    # Kafka client configuration
│   └── redisClient.js    # Redis client configuration
├── uploads/              # Uploaded CSV files storage
├── docker-compose.yaml   # Infrastructure services
├── server.js            # Express.js server
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔧 Configuration

### Redis Configuration

Redis connection settings in `lib/redisClient.js`:

```javascript
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});
```

### Kafka Configuration

Kafka broker settings in `lib/kafkaClient.js`:

```javascript
const kafka = new Kafka({
  brokers: ["localhost:29092"],
});
```

## 📊 Monitoring & Management

### RedisInsight (Redis Management)
- **URL**: `http://localhost:8001`
- **Features**: View queues, monitor jobs, inspect Redis data

### Kafka UI (Kafka Management)
- **URL**: `http://localhost:8080`
- **Features**: View topics, monitor messages, manage consumers

## 🧪 Example CSV Format

The application can process any CSV file. Here's an example:

```csv
id,name,email,age
1,John Doe,john@example.com,30
2,Jane Smith,jane@example.com,25
3,Bob Johnson,bob@example.com,35
```

## 🔄 Data Flow

1. **Upload**: Client uploads CSV file to `/upload` endpoint
2. **Queue**: Server adds processing job to BullMQ queue
3. **Process**: Worker picks up job and reads CSV file
4. **Stream**: Each CSV row is sent to Kafka topic `csv_topic`
5. **Consume**: Kafka consumer processes messages (optional)

## 📝 Available Scripts

- `npm run dev` - Start the Express server
- `npm run consume` - Start the Kafka consumer

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| Redis | 6379 | Redis server |
| RedisInsight | 8001 | Redis management UI |
| Kafka | 29092 | Kafka broker (external) |
| Kafka UI | 8080 | Kafka management UI |

## 🔍 Troubleshooting

### Common Issues

1. **Connection Refused Errors**
   - Ensure Docker services are running: `docker-compose ps`
   - Check service logs: `docker-compose logs <service-name>`

2. **Kafka Connection Issues**
   - Verify Kafka is accessible: `docker-compose logs kafka`
   - Check broker configuration in `lib/kafkaClient.js`

3. **Redis Connection Issues**
   - Verify Redis is running: `docker-compose logs redis`
   - Check Redis connection in `lib/redisClient.js`

### Logs

- **Application logs**: Check terminal output
- **Docker logs**: `docker-compose logs`
- **Individual service**: `docker-compose logs <service-name>`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Dependencies

- **express**: Web framework for Node.js
- **bullmq**: Redis-based queue for Node.js
- **kafkajs**: Apache Kafka client for Node.js
- **csv-parser**: Streaming CSV parser
- **multer**: Middleware for handling multipart/form-data
- **ioredis**: Redis client for Node.js

## 📚 Learn More

- [BullMQ Documentation](https://docs.bullmq.io/)
- [KafkaJS Documentation](https://kafka.js.org/)
- [Express.js Documentation](https://expressjs.com/)
- [Redis Documentation](https://redis.io/docs/)
