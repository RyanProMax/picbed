import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { LOCAL_STORAGE_KEY } from './constant';

type UserConfig = Record<string, RemovableRef<string>>;

export const getUserConfig = () => {
  const userConfig: UserConfig = {};
  Object.entries(LOCAL_STORAGE_KEY).forEach(([key, storageKey]) => {
    userConfig[key] = useLocalStorage(storageKey, '');
  });
  return userConfig;
};

export const checkUserConfig = (userConifg: UserConfig) => {
  return Object.values(userConifg).every(({ value }) => !!value);
};
