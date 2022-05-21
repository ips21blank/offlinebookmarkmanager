import { BsPlus, BsFolder } from '@components/icons';
import { browserAPI } from '@scripts/scripts';
import { FOL_RENAME_STR } from '@scripts/globals';

const AddFolBtn: React.FC<{ folId: string }> = ({ folId }) => {
  const makeNewFolAndRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    browserAPI.createBk({ title: FOL_RENAME_STR, parentId: folId, index: 0 });
  };

  return (
    <div className="add-fol-btn" onClick={makeNewFolAndRename}>
      <BsPlus />
      <BsFolder />
    </div>
  );
};

export { AddFolBtn };
