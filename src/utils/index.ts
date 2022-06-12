import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { ElMessage } from 'element-plus';
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
  return Object.entries(userConifg).every(([key, value]) => key === 'PATH' || !!value.value);
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

export const fileToBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});

/**
 * 上传图片
 */
export const fetchUploadFile = async(file: File, userConifg: UserConfig, sha?: string) => {
  const { account, repo, branch, path } = parseUserConfig(userConifg);
  const content = await fileToBase64(file);
  return callAPI({
    url: `https://api.github.com/repos/${account}/${repo}/contents/${path}/${file.name}`,
    method: 'put',
    data: {
      branch,
      content: content.split('base64,')[1],
      message: 'feat: upload by @RyanProMax/picbed',
      sha
    }
  });
};

/**
 * @description 转化成CDN链接
 */
export const urlToCDNUrl = (url: string) => {
  const urlFragment = url.replace('https://', '').split('/');
  return `https://cdn.jsdelivr.net/gh/${urlFragment[1]}/${urlFragment[2]}@${urlFragment[3]}/${urlFragment[4]}/${urlFragment[5]}`;
};

/**
 * @description 复制内容
 */
export const copyString = (msg: string) => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.style.opacity = '0';
  input.setAttribute('value', msg);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  ElMessage({
    message: 'Copy Success',
    type: 'success'
  });
};
