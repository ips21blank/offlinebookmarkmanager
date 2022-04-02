import { browserAPI } from '@scripts/browser/browser-api';
import { useRef, useState } from 'react';

const TitleInput: React.FC<{
  id: string;
  title: string;
  doneEditing: Function;
}> = ({ id, title, doneEditing }) => {
  const [val, setVal] = useState(title);
  const ref = useRef<HTMLInputElement>(null);
  const postChange = () => {
    browserAPI.update(id, { title: val });
    doneEditing();
  };
  const checkEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      ref.current && ref.current.blur();
    }
  };
  return (
    <input
      ref={ref}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyDown={checkEnter}
      onBlur={postChange}
    />
  );
};

export { TitleInput };
