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
      class="relative shadow-md flex justify-center overflow-hidden flex-none bg-white items-center w-full h-32 rounded-2xl"
    >
      <div class="relative w-full h-full">
        <img
          src={props.record.dataURL}
          alt=""
          class="w-full h-full object-cover object-center "
        />
        <p class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/[.10] hover:bg-sky-100/[.50] transition-colors">
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
      class="relative shadow-md flex justify-center overflow-hidden flex-none bg-white items-center w-full h-32 rounded-2xl"
    >
      <div class="relative w-full h-full">
        <p class="absolute top-0 left-0 right-0 bottom-0 text-2xl font-bold text-gray-400 flex items-center justify-center bg-white/[.10] hover:bg-sky-100/[.50] transition-colors">
          +
        </p>
      </div>
    </button>
  )
}

export default function Navbar() {
  return (
    <div class="w-full p-2 gap-2 h-full overflow-y-auto flex flex-col">
      <For each={records}>{(record) => <NavbarElement record={record} />}</For>
      <AddRecordElement />
    </div>
  )
}
