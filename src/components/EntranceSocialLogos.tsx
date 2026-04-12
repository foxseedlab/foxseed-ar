type SocialLinkId = 'x' | 'vrchat' | 'github';

type SocialLinkDefinition = {
  id: SocialLinkId;
  url: string;
  bgColor: string;
  logoSrc: string;
  twHeightClass: string;
  alt: string;
  ariaLabel: string;
  wideLogo: boolean;
};

const ENTRANCE_SOCIAL_LINKS: Omit<SocialLinkDefinition, 'ariaLabel'>[] = [
  {
    id: 'vrchat',
    url: 'https://vrchat.com/home/user/usr_e57810c0-25d0-4aee-b469-242ea7570f01',
    bgColor: '#166CCD',
    logoSrc: '/social-logos/vrchat-logo.svg',
    twHeightClass: 'h-6',
    alt: 'VRChatロゴ',
    wideLogo: true,
  },
  {
    id: 'x',
    url: 'https://x.com/foxseed2314',
    bgColor: '#1e1e1e',
    logoSrc: '/social-logos/x-logo.svg',
    twHeightClass: 'h-6',
    alt: 'Xロゴ',
    wideLogo: false,
  },
  {
    id: 'github',
    url: 'https://github.com/foxseedlab',
    bgColor: '#1F2328',
    logoSrc: '/social-logos/github-logo.svg',
    twHeightClass: 'h-7',
    alt: 'GitHubロゴ',
    wideLogo: false,
  },
];

function ariaLabelFor(id: SocialLinkId, ownerName: string): string {
  switch (id) {
    case 'x':
      return `${ownerName}のXを新しいタブで開く`;
    case 'vrchat':
      return `${ownerName}のVRChatプロフィールを新しいタブで開く`;
    case 'github':
      return `${ownerName}のGitHubを新しいタブで開く`;
  }
}

function withAriaLabels(ownerName: string): SocialLinkDefinition[] {
  return ENTRANCE_SOCIAL_LINKS.map((link) => ({
    ...link,
    ariaLabel: ariaLabelFor(link.id, ownerName),
  }));
}

type Props = {
  ownerName?: string;
  className?: string;
};

export function EntranceSocialLogos({
  ownerName = 'ふぉくしーど',
  className,
}: Props) {
  const links = withAriaLabels(ownerName);
  return (
    <ul
      className={['flex flex-row flex-wrap justify-center gap-4', className]
        .filter(Boolean)
        .join(' ')}
    >
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className={
                link.wideLogo
                  ? 'flex h-10 max-w-[min(17rem,calc(100vw-3rem))] min-w-0 items-center justify-center rounded-md px-3 py-1 sm:px-5'
                  : 'flex h-10 min-w-0 items-center justify-center rounded-md px-6'
              }
              style={{ background: link.bgColor }}
            >
              <img
                src={link.logoSrc}
                alt={link.alt}
                className={[
                  link.twHeightClass,
                  'w-auto max-w-full object-contain object-center select-none',
                ].join(' ')}
                draggable={false}
              />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
