import { createEffect, createSignal, For } from 'solid-js'
import { RecordType } from '@/shared/RecordType'
import { records, setSelectedRecord } from '@/stores/recordsStore'

function NavbarElement(props: { record: RecordType }) {
  const [date, setDate] = createSignal<string>('')
  createEffect(() => {
    const dateString = props.record.createDate.toLocaleDateString()
    const timeString = props.record.createDate.toLocaleTimeString()
    setDate(`${dateString} ${timeString}`)
  })
  return (
    <button
      type="button"
      onClick={() => setSelectedRecord(props.record)}
      class="relative flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md"
    >
      <div class="relative h-full w-full">
        <img
          src={props.record.dataURL}
          alt=""
          class="h-full w-full object-cover object-center "
        />
        <p class="absolute inset-0 flex items-center justify-center bg-white/[.10] transition-colors hover:bg-sky-100/[.50]">
          {date()}
        </p>
      </div>
    </button>
  )
}

function AddRecordElement() {
  return (
    <button
      type="button"
      onClick={() => setSelectedRecord(undefined)}
      class="relative flex h-32 w-full flex-none items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md"
    >
      <div class="relative h-full w-full">
        <p class="absolute inset-0 flex items-center justify-center bg-white/[.10] text-2xl font-bold text-gray-400 transition-colors hover:bg-sky-100/[.50]">
          +
        </p>
      </div>
    </button>
  )
}

export default function Navbar() {
  return (
    <div class="flex h-full w-full flex-col gap-2 overflow-y-auto p-2">
      <For each={records}>{(record) => <NavbarElement record={record} />}</For>
      <AddRecordElement />
    </div>
  )
}
