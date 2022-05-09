import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { LOCAL_STORAGE_KEY } from './constant';
import callAPI from './callAPI';

type UserConfig = Record<string, RemovableRef<string>>;

export const getUserConfig = () => {
  const userConfig: UserConfig = {};
  Object.entries(LOCAL_STORAGE_KEY).forEach(([key, storageKey]) => {
    userConfig[key] = useLocalStorage(storageKey, '');
  });
  return userConfig;
};

export const checkUserConfig = (userConifg: UserConfig) => {
  return Object.entries(userConifg).every(([key, value]) => key === 'PATH' || !!value);
};

export const parseUserConfig = (userConifg: UserConfig) => {
  const ret: Record<string, string> = {};
  Object.entries(userConifg).forEach(([key, value]) => {
    ret[key.toLowerCase()] = value.value;
  });
  return ret;
};

/**
 * 获取图床列表
 */
export const fetchRepoFiles = async(userConifg: UserConfig) => {
  const { account, repo, branch, path } = parseUserConfig(userConifg);
  const files = await callAPI({
    url: `https://api.github.com/repos/${account}/${repo}/contents/${path}`,
    method: 'get',
    params: {
      ref: branch
    }
  });
  return (files || []).filter((x: any) => x.type === 'file');
};
