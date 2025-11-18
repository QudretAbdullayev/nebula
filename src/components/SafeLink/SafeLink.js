'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

const SafeLink = ({ href, children, className = '', ...rest }) => {
  const locale = useLocale();

  let isValid = false;
  let localizedHref = href;

  if (typeof href === 'string' && href.trim() !== '') {
    const lowerHref = href.toLowerCase();
    const isHashOnly = href.startsWith('#');
    const isAbsolute = lowerHref.startsWith('http://') || lowerHref.startsWith('https://');
    const isMailOrTel = lowerHref.startsWith('mailto:') || lowerHref.startsWith('tel:');

    if (isHashOnly || isAbsolute || isMailOrTel) {
      return (
        <a href={href} className={className} {...rest}>
          {children}
        </a>
      );
    }

    isValid = true;
    if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
      localizedHref = href;
    } else {
      localizedHref = `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
    }
  }

  else if (
    href &&
    typeof href === 'object' &&
    typeof href.pathname === 'string' &&
    href.pathname.trim() !== ''
  ) {
    isValid = true;
    localizedHref = {
      ...href,
      pathname: `/${locale}${href.pathname.startsWith('/') ? href.pathname : `/${href.pathname}`}`,
    };
  }

  if (!isValid) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href={localizedHref} className={className} {...rest}>
      {children}
    </Link>
  );
};

export default SafeLink;