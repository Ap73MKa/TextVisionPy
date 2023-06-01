import { onMount } from 'solid-js'
import { getAllRecords } from '@/utils/database'
import Navbar from '@/components/Navbar'
import ElementInfo from '@/components/ElementInfo'
import { setRecords } from '@/stores/recordsStore'

export default function Home() {
  onMount(async () => setRecords(await getAllRecords()))
  return (
    <div class="h-screen bg-gray-100">
      <div class="grid h-full w-full grid-cols-1 grid-rows-[40px_1fr]">
        <Navbar />
        <ElementInfo />
      </div>
    </div>
  )
}
