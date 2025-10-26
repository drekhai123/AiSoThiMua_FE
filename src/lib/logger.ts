/**
 * Application logger with sensitive data redaction capabilities
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  level: LogLevel;
  enableDebug: boolean;
}

// Logger configuration based on environment
const config: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  enableDebug: process.env.NODE_ENV !== 'production' || process.env.ENABLE_DEBUG === 'true',
};

/**
 * Sensitive field patterns to redact
 */
const SENSITIVE_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /(\+?84|0)[0-9]{9,10}/g,
  cardNumber: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
};
/**
 * Known sensitive field names to redact completely
 */
const SENSITIVE_FIELDS = [
  'password',
  'token',
  'api_key',
  'apikey',
  'secret',
  'card_number',
  'card_cvv',
  'cvv',
  'pin',
  'ssn',
  'account_number',
  'routing_number',
  'credit_card',
  'debit_card',
];

/**
 * Redacts sensitive information from any value
 */
function redactValue(value: any): any {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    let redacted = value;

    // Redact email addresses
    redacted = redacted.replace(SENSITIVE_PATTERNS.email, (email) => {
      const [local, domain] = email.split('@');
      const visibleChars = Math.min(2, Math.max(1, local.length - 3));
      return `${local.substring(0, visibleChars)}***@${domain}`;
    });

    // Redact phone numbers
    redacted = redacted.replace(SENSITIVE_PATTERNS.phone, (phone) => {
      return `***${phone.slice(-3)}`;
    });

    // Redact card numbers
    redacted = redacted.replace(SENSITIVE_PATTERNS.cardNumber, '****-****-****-****');

    return redacted;
  }

  if (Array.isArray(value)) {
    return value.map(redactValue);
  }

  if (typeof value === 'object') {
    return redactObject(value);
  }

  return value;
}

/**
 * Redacts sensitive fields from an object
 */
export function redactObject<T extends Record<string, any>>(obj: T): T {
  const redacted: any = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();

    // Check if field name is sensitive
    const isSensitiveField = SENSITIVE_FIELDS.some(field =>
      lowerKey.includes(field)
    );

    if (isSensitiveField) {
      redacted[key] = '[REDACTED]';
    } else {
      redacted[key] = redactValue(value);
    }
  }

  return redacted as T;
}

/**
 * Extracts only safe fields from payment callback data
 */
export function extractSafePaymentData(data: any): Record<string, any> {
  // Guard: return empty object if data is not a valid object
  if (!data || typeof data !== 'object') {
    return {};
  }

  const safeFields = [
    'transaction_id',
    'order_id',
    'status',
    'amount',
    'currency',
    'payment_method',
    'created_at',
    'updated_at',
    'timestamp',
  ];

  const safeData: Record<string, any> = {};

  for (const field of safeFields) {
    if (data[field] !== undefined) {
      safeData[field] = data[field];
    }
  }

  return safeData;
}

/**
 * Logger class with different log levels
 */
class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (level === 'debug' && !config.enableDebug) {
      return false;
    }
    return true;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (data !== undefined) {
      // Redact sensitive data before logging
      const safeData = typeof data === 'object' && data !== null
        ? redactObject(data)
        : data;

      switch (level) {
        case 'error':
          console.error(prefix, message, safeData);
          break;
        case 'warn':
          console.warn(prefix, message, safeData);
          break;
        case 'info':
          console.info(prefix, message, safeData);
          break;
        case 'debug':
          console.debug(prefix, message, safeData);
          break;
      }
    } else {
      switch (level) {
        case 'error':
          console.error(prefix, message);
          break;
        case 'warn':
          console.warn(prefix, message);
          break;
        case 'info':
          console.info(prefix, message);
          break;
        case 'debug':
          console.debug(prefix, message);
          break;
      }
    }
  }

  debug(message: string, data?: any): void {
    this.formatMessage('debug', message, data);
  }

  info(message: string, data?: any): void {
    this.formatMessage('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.formatMessage('warn', message, data);
  }

  error(message: string, data?: any): void {
    this.formatMessage('error', message, data);
  }
}

// Export singleton logger instance
export const logger = new Logger();

// Export default
export default logger;
