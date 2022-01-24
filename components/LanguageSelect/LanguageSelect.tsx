import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';


export const languages: { name: string; code: string; flagSuffix: string }[] = [
  { name: 'English', code: 'en', flagSuffix: 'gb' },
  { name: 'Deutsch', code: 'de', flagSuffix: 'de' },
];

export const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <Select
      style={{ width: 110 }}
      showArrow={false}
      bordered={false}
      defaultValue={
        languages
          .map((x) => x.code)
          .includes(i18n.language) ? i18n.language : 'en'
      }
      onChange={(language) => {
        i18n.changeLanguage(language);
      }}
    >
      {languages.map((language) => (
        <Select.Option
          key={language.code}
          value={language.code}
        >
          <span
            className={`flag-icon flag-icon-${language.flagSuffix}`}
          /> {language.name}
        </Select.Option>
      ))}
    </Select>
  );
};
