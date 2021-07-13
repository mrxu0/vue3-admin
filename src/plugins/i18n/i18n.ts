import { createI18n } from 'vue-i18n';
import en from './language/en';
import zh from './language/zh';

export default createI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages: {
    en,
    zh,
  },
});
