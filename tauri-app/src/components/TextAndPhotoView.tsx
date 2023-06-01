import { selectedRecord } from '@/stores/recordsStore'

export default function TextAndPhotoView() {
  return (
    <div class="flex h-full w-full overflow-hidden">
      <textarea
        disabled
        class="w-1/2 resize-x overflow-y-auto border-r p-1 outline-none"
      >
        {selectedRecord()?.text}
      </textarea>
      <div class="flex max-h-full w-1/2 max-w-full items-center justify-center overflow-auto">
        <img src={selectedRecord()?.dataURL} alt="img" />
      </div>
    </div>
  )
}
