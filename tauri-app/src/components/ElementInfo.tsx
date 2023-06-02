import BrowseButton from './BrowseButton'
import { selectedRecord } from '@/stores/recordsStore'
import TextEditor from '@/components/TextEditor'
import PhotoView from '@/components/PhotoView'

export default function ElementInfo() {
  return (
    <div class="h-full w-full">
      <div class="flex h-full w-full flex-col items-center justify-center border-t bg-white">
        {selectedRecord() ? (
          <div class="flex h-full w-full overflow-hidden">
            <TextEditor />
            <PhotoView />
          </div>
        ) : (
          <BrowseButton />
        )}
      </div>
    </div>
  )
}
