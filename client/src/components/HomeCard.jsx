/* eslint-disable react/prop-types */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

function HomeCard({ data }) {
  return (
    <Link to={data.route} className="hover:shadow-md">
      <Card className="p-3">
        <CardHeader>
          {data.icon || null}
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default HomeCard;
