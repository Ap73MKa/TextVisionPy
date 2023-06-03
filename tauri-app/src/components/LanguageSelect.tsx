import { For } from 'solid-js'
import {
  HeadlessDisclosureChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from 'solid-headless'
import classNames from '@/utils/className'
import { Icon } from 'solid-heroicons'
import { chevronDown } from 'solid-heroicons/solid'
import {
  languageOptions,
  selectedLanguages,
  setSelectedLanguages,
} from '@/stores/languageStore'

export default function Example() {
  return (
    <div class="mb-4 w-60">
      <Listbox
        defaultOpen={false}
        value={selectedLanguages()}
        onSelectChange={setSelectedLanguages}
        multiple
        toggleable
      >
        <div class="relative mt-1">
          <ListboxButton
            class="relative flex min-h-[38px] w-full items-center justify-between rounded-lg border bg-white px-3 py-2
             text-left text-sm transition-colors hover:border-gray-300 hover:bg-gray-100 active:border-sky-200
              active:bg-sky-100"
          >
            {selectedLanguages().length <= 0 ? (
              <p>Choose languages</p>
            ) : (
              <p>
                {selectedLanguages()
                  .map((language) => language.name)
                  .join(', ')}
              </p>
            )}

            <Icon path={chevronDown} class="mt-[1px] h-4 w-4 text-gray-500" />
          </ListboxButton>
          <HeadlessDisclosureChild>
            {({ isOpen }) => (
              <Transition
                show={isOpen()}
                enter="transition ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 text-sm
                   shadow-lg"
                >
                  <For each={languageOptions}>
                    {(language) => (
                      <ListboxOption
                        class="group focus:outline-none"
                        value={language}
                      >
                        {({ isActive, isSelected }) => (
                          <div
                            class={classNames(
                              isActive()
                                ? 'bg-sky-100 text-sky-900'
                                : 'text-gray-900',
                              'group-hover:text-sky-900 group-hover:bg-sky-100 cursor-default select-none relative py-2 pl-8'
                            )}
                          >
                            <span
                              class={classNames(
                                isSelected() ? 'font-medium' : 'font-normal',
                                'block truncate'
                              )}
                            >
                              {language.name}
                            </span>
                          </div>
                        )}
                      </ListboxOption>
                    )}
                  </For>
                </ListboxOptions>
              </Transition>
            )}
          </HeadlessDisclosureChild>
        </div>
      </Listbox>
    </div>
  )
}
