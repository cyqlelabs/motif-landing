import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <defs>
        <mask id="logo-m">
          <rect width="640" height="640" fill="black" />
          <rect x="105" y="190" width="310" height="310" rx="44" transform="rotate(55 260 345)" fill="white" />
          <rect x="185" y="270" width="150" height="150" rx="22" transform="rotate(55 260 345)" fill="black" />
        </mask>
      </defs>
      <rect width="640" height="640" mask="url(#logo-m)" />
      <rect x="390" y="80" width="90" height="90" rx="18" transform="rotate(8 435 125)" />
      <rect x="455" y="15" width="68" height="68" rx="15" transform="rotate(5 489 49)" />
      <rect x="520" y="-10" width="48" height="48" rx="11" transform="rotate(2 544 14)" />
    </svg>
  );
}
