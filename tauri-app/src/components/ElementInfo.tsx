import {createSignal} from "solid-js";
import BrowseButton from "./BrowseButton";
import {RecordType} from "../shared/RecordType";

export default function ElementInfo() {
    const [record, setRecord] = createSignal<RecordType>()

    const handleChange = async(event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files && target.files[0]
        console.log(file)
    }

    return (
        <div class="w-full h-full p-2">
            <div class="flex items-center justify-center w-full h-full rounded-2xl bg-white">
                {record() ? <img src={record()?.photo_path} alt=""/> : <BrowseButton handleChange={(event: Event) => handleChange(event)} />}
            </div>
        </div>
    )
}