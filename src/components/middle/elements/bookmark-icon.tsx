import { BsLink45Deg } from '@components/icons';
import { browserAPI } from '@scripts/scripts';
import { useState } from 'react';

const BkmIco: React.FC<{ url: string; showIcon?: boolean }> = ({
  url,
  showIcon
}) => {
  let [err, setErr] = useState(false);

  return err && showIcon ? (
    <BsLink45Deg />
  ) : (
    <img
      src={browserAPI.getBkmIconSrc(url)}
      onError={() => showIcon && setErr(true)}
    />
  );
};

export { BkmIco };
