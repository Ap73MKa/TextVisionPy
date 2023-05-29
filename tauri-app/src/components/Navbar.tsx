function NavbarElement() {
    return (
        <button type="button" class="hover:bg-sky-100 transition flex justify-center bg-white flex-none items-center w-full h-32 rounded-2xl">
            <p>25.06.2023 11:56</p>
        </button>
    )
}

export default function Navbar() {
    return (
        <div class="w-full p-2 gap-2 h-full overflow-y-auto flex flex-col">
            <NavbarElement />
            <NavbarElement />
            <NavbarElement />
            <NavbarElement />
            <NavbarElement />
            <NavbarElement />
            <NavbarElement />
            <NavbarElement />
        </div>
    )
}