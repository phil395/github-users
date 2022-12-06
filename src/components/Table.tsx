import { FC } from "react";
// external
import styled from "styled-components";
import { TbUserMinus } from "react-icons/tb";
// hooks
import { useActions, useAppSelector } from "@hooks";
// other
import { isLoadingSelector } from "@store";
// styles
import { blockWithLabel, blockLabel } from "@styles";
//

interface Props {
  className?: string;
}

const Table: FC<Props> = ({ className }) => {
  const data = useAppSelector((state) => state.saving.data);
  const { getUserData, removeUser } = useActions();
  const isLoading = useAppSelector(isLoadingSelector);

  if (!data.length) {
    return null;
  }

  const selectionUserHandler = (login: string) => {
    if (isLoading) return;
    getUserData(login);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={className}>
      <h3 className="label">Saved Users</h3>

      <div className="content">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>Avatar</th>
                <th rowSpan={2}>Login</th>
                <th rowSpan={2}>Stars</th>
                <th rowSpan={2}>Achieves</th>
                <th rowSpan={2}>Languages</th>
                <th rowSpan={2}>Repos</th>
                <th rowSpan={2}>Followers</th>
                <th rowSpan={2}>Following</th>
                <th colSpan={2}>Contributions</th>
                <th rowSpan={2}>Created At</th>
                <th rowSpan={2}>Delete</th>
              </tr>
              <tr>
                <th className="subheader">last year</th>
                <th className="subheader">total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr
                  key={user.login}
                  title="Click to select user"
                  onClick={() => selectionUserHandler(user.login)}
                >
                  <td>
                    <img src={user.avatar} alt={user.login} loading="lazy" />
                  </td>
                  <td>{user.login}</td>
                  <td>{user.starsQty}</td>
                  <td>{user.achievementsQty}</td>
                  <td>{user.languagesQty}</td>
                  <td>{user.reposQty}</td>
                  <td>{user.followers}</td>
                  <td>{user.following}</td>
                  <td>{user.contributionsQty.lastYear}</td>
                  <td>{user.contributionsQty.total}</td>
                  <td>{user.createdAt}</td>
                  <td
                    title="Remove user"
                    onClick={() => removeUser(user.login)}
                  >
                    <TbUserMinus size={22} color="red" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .label {
    ${blockLabel}
  }

  .content {
    ${blockWithLabel}
  }

  .table {
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;

    td:first-child,
    th:first-child {
      border-radius: 10px 0 0 10px;
    }

    td:last-child,
    th:last-child {
      border-radius: 0 10px 10px 0;
    }

    th.subheader {
      border-radius: 0;
    }

    thead {
      background-color: var(--clr-primary);
      color: #fff;
      overflow: hidden;
      font-weight: bold;

      th {
        padding: 5px 10px;
      }
    }

    tbody {
      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }

      td {
        padding: 10px 10px;
      }

      tr {
        cursor: pointer;
      }

      tr:nth-of-type(even) {
        background-color: #f8f8f8;
      }

      tr:hover {
        background-color: #f2f2f2;
      }
    }

    @media screen and (max-width: 1040px) {
      font-size: 14px;
    }
  }
`;
