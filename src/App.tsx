import { useState } from "react";

interface AcidData {
  [key: string]: number;
}

const ka: AcidData = {
  HAc: 1.8e-5,
  HF: 3.5e-4,
  HCN: 4.9e-10,
  HNO2: 4.3e-4,
  H2CO3: 4.4e-7,
};

function Modal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur">
      <div className="bg-zinc-700 p-4 rounded flex flex-col">
        <h1 className="text-base text-center text-white mb-4">
          Membros do grupo
        </h1>
        <div className="text-white">
          <p>Jonas Nogueira Neto</p>
          <p>Andriw Jacintho</p>
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600 mt-4"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [acid, setAcid] = useState<string>("");
  const [concentration, setConcentration] = useState<string>("");
  const [pH, setpH] = useState<string>("0");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (acid && concentration) {
      const pHValue = (
        -Math.log10(ka[acid] * Number(concentration)) / 2
      ).toFixed(3);
      setpH(pHValue);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-zinc-800 min-h-screen p-10 flex items-center justify-center">
      <div className="bg-zinc-700 p-4 rounded flex flex-col">
        <h1 className="text-base text-center text-white mb-4">Cálculo de pH</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <select
            className="border-purple-500 text-zinc-600 p-2 rounded"
            onChange={(e) => setAcid(e.target.value)}
          >
            <option value="">Escolha um ácido</option>
            <option value="HAc">Ácido acético</option>
            <option value="HF">Ácido fluorídrico</option>
            <option value="HCN">Ácido cianídrico</option>
            <option value="HNO2">Ácido nitroso</option>
            <option value="H2CO3">Ácido carbônico</option>
          </select>
          <input
            className="border-purple-500 text-zinc-600 p-2 rounded"
            type="text"
            name="concentration"
            placeholder="Concentração (mol/L)"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
          />
          <input
            className="bg-purple-500 text-white p-2 rounded cursor-pointer hover:bg-purple-600"
            type="submit"
            value="Calcular"
          />
        </form>
        {pH !== "0" && (
          <div className="bg-purple-500 text-white p-2 rounded text-center mt-4">
            pH: {pH}
          </div>
        )}
      </div>

      {isModalOpen && <Modal onClose={handleCloseModal} />}

      <div
        className="fixed bottom-4 right-4 bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
        onClick={handleOpenModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}
