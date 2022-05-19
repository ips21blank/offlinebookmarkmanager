import { BsPlus, BsFolder } from '@components/icons';

const AddFolBtn: React.FC<any> = (props) => {
  return (
    <div className="add-fol-btn">
      <BsPlus />
      <BsFolder />
    </div>
  );
};

export { AddFolBtn };
