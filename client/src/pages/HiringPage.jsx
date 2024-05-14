/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useFileContext } from '../contexts/FileContext.jsx';
import FileTable from '../components/tables/FileTable.jsx';

function HiringPage() {
  const { files, getFiles } = useFileContext();

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <main className="flex flex-col justify-start w-[90vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw]">
      <section className="flex flex-col justify-start gap-3">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-hover">
          File
        </h1>
        <FileTable data={files}></FileTable>
      </section>
    </main>
  );
}

export default HiringPage;
