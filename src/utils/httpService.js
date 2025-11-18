"use server"
import { cache } from 'react';

export const fetchData = async (url, locale) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        cache: "no-store",
        headers: {
            "Accept-Language": locale
        }
    });

    return res.json();
}

export const fetchCachedData = cache(async (url, locale) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    next: { revalidate: 0 },
    headers: {
      "Accept-Language": locale
    }
  });

  if (!res.ok) return null;
  return res.json();
});