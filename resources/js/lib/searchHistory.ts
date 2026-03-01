// Local storage utilities for search history
const SEARCH_HISTORY_KEY = 'dieng-search-history';
const MAX_HISTORY_ITEMS = 5;

export function saveSearchQuery(query: string): void {
    if (!query.trim()) return;

    const history = getSearchHistory();

    // Remove if already exists
    const filtered = history.filter((item) => item.toLowerCase() !== query.toLowerCase());

    // Add to beginning
    const newHistory = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
}

export function getSearchHistory(): string[] {
    try {
        const history = localStorage.getItem(SEARCH_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch {
        return [];
    }
}

export function clearSearchHistory(): void {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
}

export function removeSearchItem(query: string): void {
    const history = getSearchHistory();
    const filtered = history.filter((item) => item !== query);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
}
