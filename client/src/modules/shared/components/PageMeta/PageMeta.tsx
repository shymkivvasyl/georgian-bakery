import { SITE_NAME, SITE_URL } from '@/utils/constants';

type Props = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

export const PageMeta = ({ title, description, path, noindex = false }: Props) => {
  // Add brand to the end, but not twice (home title already has it)
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  // Canonical must be a full address, not just "/menu"
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {path && <link rel="canonical" href={canonicalUrl} />}

      {/* Ask Google not to show this page in search */}
      {noindex && <meta name="robots" content="noindex" />}
    </>
  );
};
