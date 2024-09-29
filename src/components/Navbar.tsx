import PlusIcon from '../icons/PlusIcon'

function Navbar({ addColumn: addColumn }: { addColumn: () => void }) {
  return (
    <div className="flex justify-between w-full items-center mb-20 bg-[#111111] py-4 px-2">
      <div className="font-semibold ">Kanban Project</div>
      <div className="flex gap-2 items-center">
        <button
          onClick={addColumn}
          type="button"
          className="font-poppins flex gap-2 items-center bg-black text-sm rounded-lg p-2  hover:text-gray-400 active:bg-blac shadow-lg"
        >
          Criar Coluna
          <PlusIcon size={10} />
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
        >
          Sair
        </button>
      </div>
    </div>
  )
}

export default Navbar
