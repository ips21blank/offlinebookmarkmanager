import { EditNodeProps, PopupFormProps } from '@proj-types/types';
import { browserAPI } from '@scripts/scripts';
import { useState } from 'react';
import { GenericPopup } from './generic/generic-popup';

const EditNodePopup: React.FC<EditNodeProps> = (props) => {
  const [formState, setFormState] = useState({
    title: props.node.title,
    url: props.node.url || ''
  });

  let form: PopupFormProps = {
    fields: []
  };
  form.fields.push({
    id: `title-f-${props.node.title}`,
    type: 'text',
    label: 'Title',
    value: formState.title,
    setValue: (val: string) => setFormState({ ...formState, title: val })
  });

  if (props.node.url) {
    form.fields.push({
      id: `url-f-${props.node.url}`,
      type: 'text',
      label: 'URL',
      value: formState.url,
      setValue: (val: string) => setFormState({ ...formState, url: val })
    });
  }

  let actions = [
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

  let text = 'Enter Name and URL to edit the bookmark.';
  let editNodeProps = { ...props, actions, form, text };

  return <GenericPopup {...editNodeProps} />;
};

export { EditNodePopup };
