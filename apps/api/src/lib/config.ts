interface Config {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  databaseUrl: string;
  redisUrl: string;
  nodeEnv: string;
  maxFileSize: number;
  uploadDir: string;
  rateLimitMax: number;
  rateLimitWindow: number;
  sentryDsn?: string;
  smtp?: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
}

export const config: Config = {
  port: Number(process.env.PORT) || 3333,
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  nodeEnv: process.env.NODE_ENV || 'development',
  maxFileSize: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,
  rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15min
  sentryDsn: process.env.SENTRY_DSN,
  smtp: process.env.SMTP_HOST ? {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.FROM_EMAIL || 'noreply@moneymap.com',
  } : undefined,
};

// Validation
if (!config.databaseUrl) {
  console.warn('⚠️  DATABASE_URL not set - database features will be disabled');
}

if (config.nodeEnv === 'production' && config.jwtSecret === 'fallback-secret-key') {
  throw new Error('JWT_SECRET must be set in production');
}
