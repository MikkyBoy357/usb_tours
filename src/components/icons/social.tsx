type IconProps = React.SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      {...props}
    >
      <title>Instagram</title>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" {...props}>
      <title>YouTube</title>
      <path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C16.5 3.6 12 3.6 12 3.6h0s-4.5 0-7.9.3c-.5.1-1.4.1-2.2 1C1.2 5.6 1 7.2 1 7.2S.7 9.1.7 11v1.8c0 1.9.3 3.8.3 3.8s.2 1.6.9 2.3c.8.9 1.9.8 2.4.9 1.7.2 7.7.3 7.7.3s4.5 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.8V11c0-1.9-.3-3.8-.3-3.8zM9.8 14.9V8.3l5.8 3.3-5.8 3.3z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" {...props}>
      <title>Facebook</title>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" {...props}>
      <title>TikTok</title>
      <path d="M19.6 7.2a6 6 0 0 1-3.5-1.1V16a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.9 2.9 0 1 0 2 2.7V2h2.8a3.6 3.6 0 0 0 3.5 3.5v1.7Z" />
    </svg>
  );
}
