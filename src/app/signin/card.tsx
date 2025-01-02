import { JSX } from 'react';
import { GiMonkey } from 'react-icons/gi';

export function Card({ message, content }: { message: JSX.Element; content: JSX.Element[] }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="card card-bordered bg-base-100 w-96 shadow-xl m-6 mb-12">
        <div className="card-body items-center">
          <div className="card-title">
            <GiMonkey size={64} />
            <span className="text-2xl">pongo</span>
          </div>
          {message}
          {content.reduce((acc, element, index) => {
            acc.push(element);
            if (index < content.length - 1) {
              acc.push(<div key={`content-${index}`} className="divider divider-primary"></div>);
            }
            return acc;
          }, [] as JSX.Element[])}
        </div>
      </div>
    </div>
  );
}
