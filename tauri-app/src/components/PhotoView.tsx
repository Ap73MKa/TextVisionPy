import { selectedRecord } from '@/stores/recordsStore'
import { createEffect, createSignal, JSXElement, onMount } from 'solid-js'
import { useZoomImageWheel } from '@zoom-image/solid'
import { Icon } from 'solid-heroicons'
import {
  magnifyingGlassMinus,
  magnifyingGlassPlus,
} from 'solid-heroicons/solid'

function ZoomIcon(props: {
  onClick: () => void
  icon: {
    path: JSXElement
    outline: boolean
    mini: boolean
  }
}) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      <Icon
        path={props.icon}
        class="h-5 w-5 text-gray-500 transition-colors hover:text-gray-600 active:text-gray-800"
      />
    </button>
  )
}

export default function PhotoView() {
  let container: HTMLDivElement
  const { createZoomImage, zoomImageState, setZoomImageState } =
    useZoomImageWheel()
  const [date, setDate] = createSignal('')
  createEffect(() => {
    const record = selectedRecord()
    if (!record) return
    const dateString = record.createDate.toLocaleDateString()
    const timeString = record.createDate.toLocaleTimeString()
    setDate(`${dateString} ${timeString}`)
  })

  onMount(() => {
    createZoomImage(container)
  })

  const zoomInWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom + 0.5,
    })

  const zoomOutWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom - 0.5,
    })

  return (
    <div class="relative flex h-[calc(100vh_-_41px)] w-full items-center justify-center overflow-hidden">
      <div class="absolute left-0 top-0 z-20 flex gap-2 p-2">
        <ZoomIcon onClick={zoomOutWheel} icon={magnifyingGlassMinus} />
        <ZoomIcon onClick={zoomInWheel} icon={magnifyingGlassPlus} />
        <p class="line-clamp-1 text-sm">{selectedRecord()?.name}</p>
      </div>
      <div class="absolute bottom-0 right-0 z-20 mb-1 mr-2">
        <p class="line-clamp-1 text-sm">{date()}</p>
      </div>
      <div
        // eslint-disable-next-line
        // @ts-ignore
        ref={container}
        class="!overflow-visible"
      >
        <img src={selectedRecord()?.dataURL} alt="img" class="h-full w-full" />
      </div>
    </div>
  )
}
