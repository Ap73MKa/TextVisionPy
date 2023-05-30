import Navbar from '@/components/Navbar'
import ElementInfo from '@/components/ElementInfo'
import { createSignal, onMount } from 'solid-js'
import { RecordType } from '@/shared/RecordType'
import { getAllRecords } from '@/utils/database'

export default function App() {
  const [records, setRecords] = createSignal<RecordType[]>([])
  const [selectedRecord, setSelectedRecord] = createSignal<RecordType>()
  onMount(async () => {
    setRecords(await getAllRecords())
  })
  return (
    <div class="h-screen">
      <div class="bg-gray-100 w-full h-full grid grid-rows-1 grid-cols-[250px_1fr]">
        <Navbar
          records={records()}
          selectedRecord={selectedRecord()}
          setSelectedRecord={setSelectedRecord}
        />
        <ElementInfo
          selectedRecord={selectedRecord()}
          setSelectedRecord={setSelectedRecord}
          setRecords={setRecords}
        />
      </div>
    </div>
  )
}
