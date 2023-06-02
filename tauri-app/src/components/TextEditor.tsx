import { selectedRecord } from '@/stores/recordsStore'
import { CodeMirror } from '@solid-codemirror/codemirror'

export default function TextEditor() {
  return (
    <CodeMirror
      value={selectedRecord()?.text}
      class="h-[calc(100vh_-_41px)] w-full resize-x overflow-y-auto border-r"
      wrapLine={true}
    />
  )
}
