import BrowseButton from './BrowseButton'
import { selectedRecord } from '@/stores/recordsStore'
import TextAndPhotoView from '@/components/TextAndPhotoView'

export default function ElementInfo() {
  return (
    <div class="h-full w-full">
      <div class="flex h-full w-full flex-col items-center justify-center border-t bg-white">
        {selectedRecord() ? <TextAndPhotoView /> : <BrowseButton />}
      </div>
    </div>
  )
}
