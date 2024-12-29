import { MdOutlineAdd } from 'react-icons/md';

export default function Fab() {
  return (
    <div className="toast mb-16 md:mb-0 z-10">
      <div className="dropdown dropdown-top dropdown-end">
        <label tabIndex={0} className="btn btn-primary btn-circle">
          <MdOutlineAdd size={30} />
        </label>
      </div>
    </div>
  );
}
