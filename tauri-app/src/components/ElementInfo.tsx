import BrowseButton from './BrowseButton'
import { selectedRecord } from '@/stores/recordsStore'
import TextEditor from '@/components/TextEditor'
import PhotoView from '@/components/PhotoView'
import { Panel, PanelGroup, ResizeHandle } from 'solid-resizable-panels'
import 'solid-resizable-panels/styles.css'

export default function ElementInfo() {
  return (
    <div class="h-full w-full">
      <div class="flex h-full w-full flex-col items-center justify-center border-t bg-white">
        {selectedRecord() ? (
          <div class="flex h-full w-full">
            <PanelGroup>
              <Panel id="1">
                <TextEditor />
              </Panel>
              <ResizeHandle />
              <Panel id="2" collapsible>
                <PhotoView />
              </Panel>
            </PanelGroup>
          </div>
        ) : (
          <BrowseButton />
        )}
      </div>
    </div>
  )
}
