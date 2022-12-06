import { ChangeEventHandler, FC, Fragment } from "react";
// external
import styled, { css } from "styled-components";
//

export interface IRadioOption {
  id: string;
  value: string | number;
  label: string | number;
  defaultChecked?: boolean;
}

interface Props {
  className?: string;
  title?: string;
  name: string;
  options: IRadioOption[];
  onChange: ChangeEventHandler<HTMLFormElement>;
}

const Toggler: FC<Props> = ({ className, name, options, onChange }) => {
  return (
    <form className={className} onChange={onChange}>
      {options.map((option) => (
        <Fragment key={option.id}>
          <input
            id={option.id}
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={option.defaultChecked}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </Fragment>
      ))}
    </form>
  );
};


export default styled(Toggler)`
  display: inline-flex;

  ${(props) =>
    props.title
      ? css`
          &::before {
            content: "${props.title}:";
            display: inline-block;
            margin-top: 4px;
            margin-right: 10px;
          }
        `
      : null}

  input {
    appearance: none;
  }

  input:focus {
    outline: none;
  }

  input:focus + label {
    outline: 1px solid var(--clr-primary);
    outline-offset: 1px;
  }

  input:checked + label {
    color: white;
    background-color: var(--clr-primary);
  }

  input:not(:checked) + label:hover {
    color: var(--clr-muted);
    border-color: var(--clr-muted);
    cursor: pointer;
  }

  label {
    border: 1px solid var(--clr-primary);
    padding: 4px 10px;
  }

  label:not(:last-child) {
    border-right: none;
  }

  label:first-of-type {
    border-bottom-left-radius: var(--radius-sm);
    border-top-left-radius: var(--radius-sm);
  }

  label:last-of-type {
    border-bottom-right-radius: var(--radius-sm);
    border-top-right-radius: var(--radius-sm);
  }
`;
