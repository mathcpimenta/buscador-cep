import React, { useState, useRef } from "react";
import api from "./services/api";
import DataShow from './components/DataShow'
import { ILocal } from "./interfaces/interfaces";

function App() {
  const [local, setLocal] = useState<ILocal>();

  const searchForm = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cep = searchForm.current?.value.replaceAll('-', '');
    
    api
      .get(`${cep}/json`)
      .then(response => {
        setLocal(response.data);
      })
  }

  return (
    <div className="App">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Buscador de CEP
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                <input
                    id="email-address"
                    name="cep"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Insira seu CEP"
                    ref={searchForm} 
                />
                </div>
            </div>
            <div>
                <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Buscar
                </button>
            </div>
        </form>

          {local && (
            <DataShow local={local} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
