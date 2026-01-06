const STORAGE_KEY = 'article_views';
const BASE_VIEWS = 1000;
const MAX_RANDOM_VIEWS = 5000;

function getRandomViews(): number {
  return Math.floor(Math.random() * MAX_RANDOM_VIEWS) + BASE_VIEWS;
}

export function getArticleViews(articleId: string): number {
  const storedViews = localStorage.getItem(STORAGE_KEY);
  const viewsMap: Record<string, number> = storedViews ? JSON.parse(storedViews) : {};

  if (!viewsMap[articleId]) {
    viewsMap[articleId] = getRandomViews();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewsMap));
  }

  return viewsMap[articleId];
}

export function updateArticleViews(articleId: string): number {
  const newViews = getRandomViews();
  const storedViews = localStorage.getItem(STORAGE_KEY);
  const viewsMap: Record<string, number> = storedViews ? JSON.parse(storedViews) : {};

  viewsMap[articleId] = newViews;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewsMap));

  return newViews;
}

export function getAllArticleViews(): Record<string, number> {
  const storedViews = localStorage.getItem(STORAGE_KEY);
  return storedViews ? JSON.parse(storedViews) : {};
}

export function initializeArticleViews(articleIds: string[]): void {
  const storedViews = localStorage.getItem(STORAGE_KEY);
  const viewsMap: Record<string, number> = storedViews ? JSON.parse(storedViews) : {};

  articleIds.forEach(id => {
    if (!viewsMap[id]) {
      viewsMap[id] = getRandomViews();
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewsMap));
}
