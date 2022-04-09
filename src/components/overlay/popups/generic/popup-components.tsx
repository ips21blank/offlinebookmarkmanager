/**
 * This is the only file that does not use type checking. Checks
 * are preformed before the following functions are called.
 */

function PopupTitle({ title, alignTitle }: any) {
  return title ? (
    <div className={`popup-title${alignTitle ? ' ' + alignTitle : ''}`}>
      {title}
    </div>
  ) : (
    <></>
  );
}

function PopupText({ text }: any) {
  return text ? <div className="popup-text">{text}</div> : <></>;
}

function PopupFormField({ id, type, label, disabled, value, setValue }: any) {
  return (
    <div className="popup-input">
      {label ? <label htmlFor="">{label}</label> : ''}
      <input
        id={id}
        type={type}
        value={value}
        disabled={!!disabled}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
function PopupForm({ title, text, fields }: any) {
  if (!fields) return <></>;

  // Each field should have its own setvalue at this point.
  return (
    <div className="popup-form">
      {title ? <span className="popup-form-title">{title}</span> : ''}
      {text ? <span className="popup-form-text">{text}</span> : ''}
      {fields.map((field: any) => (
        <PopupFormField {...field} key={field.id} />
      ))}
    </div>
  );
}

function Button({ title, action }: any) {
  return (
    <div className="popup-btn" onClick={action}>
      {title}
    </div>
  );
}
function PopupButtons({ actions, alignButtons }: any) {
  // Atleast one button is always there.
  return (
    <div className={`popup-buttons${alignButtons ? ' ' + alignButtons : ''}`}>
      {actions.map((btn: any) => (
        <Button
          title={btn.title}
          action={btn.action}
          key={'btn-' + Math.random()}
        />
      ))}
    </div>
  );
}

export { PopupTitle, PopupText, PopupButtons, PopupForm };
