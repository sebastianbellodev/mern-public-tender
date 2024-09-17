import SupplierTable from '../components/tables/SupplierTable.jsx';

function SupplierPage() {
  return (
    <main className="pt-[20vh] flex flex-col justify-start w-screen px-28 overflow-hidden scrollbar-hide">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Supplier
      </h1>
      <SupplierTable></SupplierTable>
    </main>
  );
}

export default SupplierPage;
