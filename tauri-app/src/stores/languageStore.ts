import { createSignal } from 'solid-js'
import { LanguageOptionType } from '@/shared/LanguageOptionType'

export const languageOptions: LanguageOptionType[] = [
  { name: 'English', value: 'eng' },
  { name: 'Russian', value: 'rus' },
  { name: 'German', value: 'deu' },
]

export const [selectedLanguages, setSelectedLanguages] = createSignal([
  languageOptions[0],
])
