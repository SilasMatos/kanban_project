import PlusIcon from '../icons/PlusIcon'

function Navbar({ addColumn: addColumn }: { addColumn: () => void }) {
  return (
    <div className="flex justify-between w-full items-center mb-20 bg-[#1C1C1C] py-4 px-2">
      <div className="font-semibold">Kanban Project</div>
      <button
        onClick={addColumn}
        type="button"
        className="font-poppins flex gap-2 items-center bg-black text-sm rounded-lg p-2  hover:text-gray-400 active:bg-blac shadow-lg"
      >
        Criar Coluna
        <PlusIcon size={10} />
      </button>
    </div>
  )
}

export default Navbar
