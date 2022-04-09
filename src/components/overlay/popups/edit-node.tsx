import { EditNodeProps } from '@proj-types/types';
import { browserAPI } from '@scripts/browser/browser-api';
import { useState } from 'react';
import { Popup } from './generic/popup';

const EditNodePopup: React.FC<EditNodeProps> = (props) => {
  const [formState, setFormState] = useState({
    title: props.node.title,
    url: props.node.url
  });

  props.form = {
    fields: []
  };
  props.form.fields.push({
    id: `title-f-${props.node.title}`,
    type: 'text',
    label: 'Title',
    value: formState.title,
    setValue: (val: string) => setFormState({ ...formState, title: val })
  });

  if (props.node.url) {
    props.form.fields.push({
      id: `url-f-${props.node.url}`,
      type: 'text',
      label: 'URL',
      value: props.node.url,
      setValue: (val: string) => setFormState({ ...formState, url: val })
    });
  }

  props.actions = [
    {
      title: 'Edit',
      action: () => {
        let changeObj: any = { title: formState.title };
        if (props.node.url) changeObj.url = formState.url;

        browserAPI.update(props.node.id, changeObj);
        props.toggleOverlay();
      }
    },
    {
      title: 'Cancel',
      action: () => {
        props.toggleOverlay();
      }
    }
  ];

  return <Popup {...props} />;
};

export { EditNodePopup };
