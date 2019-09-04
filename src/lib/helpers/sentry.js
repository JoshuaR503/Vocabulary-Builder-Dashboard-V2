import * as Sentry from '@sentry/browser';

/**
 * Exeption Capture.
 * @param error 
 */
const reportExeption = error => {
    Sentry.captureException(error);
}

/**
 * Message Capture.
 * @param message 
 * @param level 
 */
const reportMessage = (message, level = 'info') => {
    Sentry.captureMessage(message, level);
}

export {
    reportExeption,
    reportMessage
}