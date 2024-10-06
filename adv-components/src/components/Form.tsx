import {
  useImperativeHandle,
  useRef,
  forwardRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: Record<string, FormDataEntryValue>) => void;
};

export type FormHandle = { clear: () => void };

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref,
) {
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      formRef.current?.reset();
    },
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data); // Assuming onSave can handle this data structure
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} {...otherProps}>
      {children}
    </form>
  );
});

export default Form;
