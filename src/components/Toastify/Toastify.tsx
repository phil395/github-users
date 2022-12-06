import { FC } from "react";
// external
import styled from "styled-components";
// components
import Item from "./Toastify.Item";
// hooks
import { useAppSelector } from "@hooks";
import { useToastifyReducerError } from "./Toastify.hooks";
// other
import { selectToastifyMsg } from "@store";
//

interface Props {
  className?: string;
}

const Toastify: FC<Props> = ({ className }) => {
  useToastifyReducerError({ sliceName: "api" });
  useToastifyReducerError({ sliceName: "parser" });
  useToastifyReducerError({ sliceName: "saving", autoReset: true });

  const toasts = useAppSelector(selectToastifyMsg);

  if (!toasts?.length) return null;

  return (
    <ul className={className}>
      {toasts.map((toast) => (
        <Item key={toast.id} toast={toast} />
      ))}
    </ul>
  );
};

export default styled(Toastify)`
  position: fixed;
  right: 0;
  bottom: 0;
  margin-right: var(--offset-md);
  list-style: none;
`;
