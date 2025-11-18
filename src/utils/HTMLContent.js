"use client";

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

export const HtmlContent = ({ html, className }) => {
  const [cleanHtml, setCleanHtml] = useState('');

  useEffect(() => {
    if (html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const sanitizedHtml = DOMPurify.sanitize(doc.body.innerHTML, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["scrolling", "no"],
      });
      setCleanHtml(sanitizedHtml);
    }
  }, [html]);

  return <div className={className ? className : ""} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}
