import { SquareGanttChart, Package } from 'lucide-react';

import Card from '../components/HomeCard.jsx';

const SIZE = 34;

const options = [
  {
    route: '/hirings',
    icon: <SquareGanttChart size={SIZE} />,
    title: 'Hirings',
    description: 'Add, edit, and delete files.',
  },
  {
    route: '/tenderers',
    icon: <Package size={SIZE} />,
    title: 'Suppliers',
    description: 'Add, edit, and delete suppliers.',
  },
];

function HomePage() {
  return (
    <main className="pt-[20vh] pb-[10vh] flex justify-start items-center w-screen h-fit">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mx-12">
        {options.map((option, index) => (
          <Card key={index} data={option} />
        ))}
      </section>
    </main>
  );
}

export default HomePage;
