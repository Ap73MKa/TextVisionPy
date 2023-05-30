import { createEffect, createSignal, For } from 'solid-js'
import { RecordType } from '@/shared/RecordType'

function NavbarElement(props: {
  record: RecordType
  setSelectedRecord: (record: RecordType) => void
}) {
  const [date, setDate] = createSignal<string>('')
  createEffect(() => {
    const dateString = props.record.createDate.toLocaleDateString()
    const timeString = props.record.createDate.toLocaleTimeString()
    setDate(`${dateString} ${timeString}`)
  })
  return (
    <button
      type="button"
      onClick={() => props.setSelectedRecord(props.record)}
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

function AddRecordElement(props: {
  setSelectedRecord: (record: RecordType | undefined) => void
}) {
  return (
    <button
      type="button"
      onClick={() => props.setSelectedRecord(undefined)}
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

export default function Navbar(props: {
  records: RecordType[] | undefined
  selectedRecord: RecordType | undefined
  setSelectedRecord: (record: RecordType | undefined) => void
}) {
  return (
    <div class="w-full p-2 gap-2 h-full overflow-y-auto flex flex-col">
      <For each={props.records}>
        {(record) => (
          <NavbarElement
            record={record}
            setSelectedRecord={props.setSelectedRecord}
          />
        )}
      </For>
      <AddRecordElement setSelectedRecord={props.setSelectedRecord} />
    </div>
  )
}
