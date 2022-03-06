import { resolve } from 'path';

export const DefaulTemplatesPaths: { [key: string]: string } = {
  'confluence-storage': resolve(__dirname, '..', './Templaters/ConfluenceStorage/template.html'),
  'confluence-wiki': resolve(__dirname, '..', './Templaters/ConfluenceWiki/template.md'),
  html: resolve(__dirname, '..', './Templaters/Html/template.html'),
  md: resolve(__dirname, '..', './Templaters/Markdown/template.md'),
};