import { selectedRecord } from '@/stores/recordsStore'
import { CodeMirror } from '@solid-codemirror/codemirror'

export default function TextEditor() {
  return (
    <CodeMirror
      value={selectedRecord()?.text}
      class="h-[calc(100vh_-_41px)] w-full overflow-y-auto border-r scrollbar-thin scrollbar-thumb-gray-200"
      wrapLine={true}
    />
  )
}
