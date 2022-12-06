import { FC } from "react";
// external
import styled from "styled-components";
// hooks
import { useAppSelector } from "@hooks";
//

interface Props {
  className?: string;
}

const Limit: FC<Props> = ({ className }) => {
  const limit = useAppSelector((state) => state.api.limit);

  if (!limit) return null;

  const rest = limit.limit - limit.used;

  return (
    <div className={className}>
      <span>
        Rest requests:&nbsp;
        <span className={rest < 10 ? "danger" : undefined}>{rest}</span>
      </span>
    </div>
  );
};

export default styled(Limit)`
  white-space: nowrap;
  display: flex;
  letter-spacing: 2px;

  align-items: center;
  font-size: 1.5rem;
  color: #424242;

  .danger {
    color: red;
  }

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
