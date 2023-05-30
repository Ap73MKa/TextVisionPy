import DocumentIcon from '@/assets/document.svg'

export default function BrowseButton(props: {
  handleChange: (event: Event) => void
}) {
  const handleChange = (event: Event) => {
    props.handleChange(event)
  }
  return (
    <div class="flex flex-col items-center gap-4 bg-gray-100 h-32 justify-center border-2 pr-4 border-gray-300 hover:bg-gray-200 transition-colors border-dotted rounded-xl">
      <label for="doc" class="flex items-center">
        <div class="w-24 h-24">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <DocumentIcon class="fill-gray-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-500">Browse file</p>
          <p class="text-gray-500 text-sm">.jpg, .png, .gif, .web</p>
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
