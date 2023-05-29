import Navbar from "./components/Navbar";
import ElementInfo from "./components/ElementInfo";

export default function App() {
  return (
      <div class="h-screen">
        <div class="bg-gray-100 w-full h-full grid grid-rows-1 grid-cols-[250px_1fr]">
            <Navbar />
            <ElementInfo />
        </div>
      </div>
  );
}
