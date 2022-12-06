import { FC, useState, FormEvent } from "react";
// external
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
// hooks
import { useActions, useAppSelector } from "@hooks";
// other
import { isLoadingSelector } from "@store";
import { ToastType /* enum */ } from "@store";
// style
import { btn } from "../assets/styles";
//

interface Props {
  className?: string;
}

const Search: FC<Props> = ({ className }) => {
  const [search, setSearch] = useState<string>("");
  const { getUserData, addToast } = useActions();
  const isLoading = useAppSelector(isLoadingSelector);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length > 3) getUserData(search);
    else
      addToast({
        text: "The minimum length is 3 characters",
        type: ToastType.Info,
      });
  };

  return (
    <form className={className} onSubmit={submitHandler}>
      <label htmlFor="search">
        <BiSearch />
      </label>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
        name="search"
        placeholder="Enter github user"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};

export default styled(Search)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px var(--offset-md);
  background-color: #fff;
  border-radius: var(--radius-sm);
  box-shadow: var(--box-shadow);

  *:not(:last-child) {
    margin-right: var(--offset-md);
  }

  input {
    flex: 1 1 auto;
    width: 100%;
    padding: 5px 10px;
    border: none;
    align-self: stretch;
    border-radius: var(--radius-sm);
    outline-offset: -2px;
    font-size: 1rem;

    &::placeholder {
      color: var(--clr-muted);

      @media screen and (max-width: 500px) {
        font-size: 13px;
      }
    }
  }

  label {
    font-size: 1.2rem;
    color: var(--clr-muted);

    svg {
      margin-top: 3px;
    }

    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  button {
    ${btn}
  }
`;
