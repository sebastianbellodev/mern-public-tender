import FileTable from '../components/tables/FileTable.jsx';

function HiringPage() {
  return (
    <main className="pt-[20vh] flex flex-col justify-start w-screen px-28 overflow-hidden scrollbar-hide">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        File
      </h1>
      <FileTable></FileTable>
    </main>
  );
}

export default HiringPage;
