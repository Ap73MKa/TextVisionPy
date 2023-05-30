import { onMount } from 'solid-js'
import { getAllRecords } from '@/utils/database'
import Navbar from '@/components/Navbar'
import ElementInfo from '@/components/ElementInfo'
import { setRecords } from '@/stores/recordsStore'

export default function Home() {
  onMount(async () => {
    setRecords(await getAllRecords())
  })
  return (
    <div class="h-screen">
      <div class="bg-gray-100 w-full h-full grid grid-rows-1 grid-cols-[250px_1fr]">
        <Navbar />
        <ElementInfo />
      </div>
    </div>
  )
}
