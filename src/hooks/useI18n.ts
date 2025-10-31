import { useEffect, useState, useCallback } from 'react';

type TranslationKeys = 'common' | 'hero' | 'projects' | 'experience' | 'skills' | 'contact';

interface Translations {
  [key: string]: any;
}

const loadedTranslations: { [key: string]: Translations } = {};
const listeners: { [key: string]: Array<(translations: Translations) => void> } = {};

const loadTranslations = async (namespace: TranslationKeys) => {
  if (loadedTranslations[namespace]) {
    return loadedTranslations[namespace];
  }

  try {
    const response = await import(`@/i18n/es/${namespace}.json`);
    const translations = response.default;
    loadedTranslations[namespace] = translations;
    if (listeners[namespace]) {
      listeners[namespace].forEach(listener => listener(translations));
    }
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${namespace}:`, error);
    return {};
  }
};

export const useI18n = (namespace: TranslationKeys) => {
  const [translations, setTranslations] = useState<Translations>(loadedTranslations[namespace] || {});
  const [loading, setLoading] = useState(!loadedTranslations[namespace]);

  useEffect(() => {
    if (loadedTranslations[namespace]) {
      setTranslations(loadedTranslations[namespace]);
      setLoading(false);
      return;
    }

    const newListener = (newTranslations: Translations) => {
      setTranslations(newTranslations);
      setLoading(false);
    };

    if (!listeners[namespace]) {
      listeners[namespace] = [];
    }
    listeners[namespace].push(newListener);

    loadTranslations(namespace);

    return () => {
      listeners[namespace] = listeners[namespace].filter(listener => listener !== newListener);
    };
  }, [namespace]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // No warning here, as it can be called before translations are loaded
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [translations]);

  return { t, loading, translations };
};

export const useMultipleI18n = (namespaces: TranslationKeys[]) => {
    const [allTranslations, setAllTranslations] = useState<{ [key: string]: Translations }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAll = async () => {
            const promises = namespaces.map(ns => loadTranslations(ns));
            const results = await Promise.all(promises);
            const newTranslations: { [key: string]: Translations } = {};
            namespaces.forEach((ns, index) => {
                newTranslations[ns] = results[index];
            });
            setAllTranslations(newTranslations);
            setLoading(false);
        };
        loadAll();
    }, [namespaces]);

    const t = useCallback((namespace: TranslationKeys, key: string): string => {
        const translations = allTranslations[namespace];
        if (!translations) return key;

        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    }, [allTranslations]);

    return { t, loading, translations: allTranslations };
};
