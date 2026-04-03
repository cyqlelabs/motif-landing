'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useId } from 'react';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface WaitlistFormProps {
  placeholder: string;
  cta: string;
  successText: string;
  successSub: string;
  errorText: string;
  className?: string;
}

export function WaitlistForm({
  placeholder,
  cta,
  successText,
  successSub,
  errorText,
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    const trimmed = email.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }

    setStatus('loading');

    const url = process.env.NEXT_PUBLIC_WAITLIST_URL;
    if (!url) {
      // Dev fallback: log and show success so UI can be tested
      console.warn('[waitlist] NEXT_PUBLIC_WAITLIST_URL is not set');
      setTimeout(() => setStatus('success'), 600);
      return;
    }

    try {
      // no-cors: GAS web apps don't reliably echo CORS headers in all deploy
      // configurations. The fetch never rejects with no-cors — data still lands
      // in the sheet. The catch below only fires on a real network failure.
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'hero' }),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-3 w-full', className)}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="flex items-center gap-2.5 text-primary"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easeOut }}
            role="status"
            aria-live="polite"
          >
            <CheckCircle />
            <div className="flex flex-col items-start">
              <span className="text-base font-semibold leading-tight">{successText}</span>
              <span className="text-sm text-muted-foreground">{successSub}</span>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="flex w-full max-w-md"
            noValidate
          >
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            {/* Fused pill: input + button share one pill container */}
            <div
              className={cn(
                'group flex w-full items-center rounded-full',
                'bg-background border transition-colors duration-150',
                status === 'error' ? 'border-destructive' : 'border-border focus-within:border-primary',
              )}
            >
              <input
                ref={inputRef}
                id={inputId}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={placeholder}
                autoComplete="off"
                name="waitlist-email"
                spellCheck={false}
                disabled={status === 'loading'}
                className={cn(
                  'flex-1 min-w-0 bg-transparent pl-5 pr-2 py-3',
                  'text-sm text-foreground placeholder:text-muted-foreground',
                  'outline-none disabled:opacity-60',
                )}
                aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'shrink-0 m-1 flex items-center gap-2 rounded-full px-5 py-2.5',
                  'bg-primary text-primary-foreground text-sm font-medium',
                  'transition-all duration-150',
                  'hover:bg-primary/90 active:scale-95',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                  'focus-visible:outline-none',
                )}
              >
                {status === 'loading' ? <Spinner /> : (
                  <>
                    <span>{cta}</span>
                    <ArrowRight />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            id="waitlist-error"
            className="text-xs text-destructive"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
          >
            {errorText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
