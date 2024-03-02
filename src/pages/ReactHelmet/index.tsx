import { useEffect, useState } from 'react';
import HelmetComp from './components/HelmetComp';

interface Heads {
  title: string;
  description: string[];
  ogTitle: string[];
  ogDescription: string[];
}

const qs = (selector: string) => document.querySelector(selector);
const qsa = (selector: string) => document.querySelectorAll(selector);

export default function ReactHelmet() {
  const [heads, setHeads] = useState<Heads | null>(null);

  useEffect(() => {
    const metaTitle = qs('title')?.innerHTML as string;
    const metaDescription = [...qsa('meta[name="description"]')].map((tag) => tag.outerHTML);
    const metaOgTitles = [...qsa('meta[property="og:title"]')].map((tag) => tag.outerHTML);
    const metaOgDescriptions = [...qsa('meta[property="og:description"]')].map(
      (tag) => tag.outerHTML
    );

    setHeads((prev) => ({
      ...prev,
      title: metaTitle,
      description: metaDescription,
      ogTitle: metaOgTitles,
      ogDescription: metaOgDescriptions,
    }));
  }, []);

  return (
    <>
      <HelmetComp title="리액트 헬멧" description="리액트 헬멧으로 메타 태그 동적 할당 중입니다." />
      <div>react-helmet-async를 활용한 SEO 최적화 및 og meta 태그 동적 할당 테스트 공간입니다.</div>
      <h3>title</h3>
      <p>{heads?.title}</p>
      <h3>description</h3>
      {heads?.description.map((description) => (
        <p key={description}>{description}</p>
      ))}
      <h3>og title</h3>
      {heads?.ogTitle.map((title) => (
        <p key={title}>{title}</p>
      ))}
      <h3>og description</h3>
      {heads?.ogDescription.map((description) => (
        <p key={description}>{description}</p>
      ))}
    </>
  );
}
