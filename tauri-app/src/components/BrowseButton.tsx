import DocumentIcon from '@/assets/document.svg'

export default function BrowseButton(props: {
  handleChange: (event: Event) => void
}) {
  const handleChange = (event: Event) => {
    props.handleChange(event)
  }
  return (
    <div class="flex h-32 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dotted border-gray-300 bg-gray-100 pr-4 transition-colors hover:bg-gray-200">
      <label for="doc" class="flex items-center">
        <div class="h-24 w-24">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <DocumentIcon class="fill-gray-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-500">Browse file</p>
          <p class="text-sm text-gray-500">.jpg, .png, .gif, .web</p>
        </div>
        <input
          type="file"
          id="doc"
          name="doc"
          onChange={handleChange}
          accept="image/*,.png,.jpg,.gif,.web"
          hidden
        />
      </label>
    </div>
  )
}
