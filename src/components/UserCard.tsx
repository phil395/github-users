import { FC } from "react";
// external
import styled from "styled-components";
import {
  IoBusiness,
  IoLinkSharp,
  IoLocationSharp,
  IoLogoTwitter,
} from "react-icons/io5";
import { shallowEqual } from "react-redux";
// components
import { Spinner } from "@components";
// hooks
import { useActions, useAppSelector } from "@hooks";
// other
import { selectAchievementsData } from "@store";
// styles
import { blockLabel, blockWithLabel } from "@styles";
// types
import type { IUser } from "@models/user";
//

interface Props {
  user: IUser;
  className?: string;
}

const UserCard: FC<Props> = ({ className, user }) => {
  const { saveUser } = useActions();

  const achievementsData = useAppSelector(selectAchievementsData, shallowEqual);

  const checkSaving = () => {
    if (localStorage.getItem(user.login)) {
      return true;
    }
    return false;
  };

  const savingHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    saveUser();
    const btn = e.target as HTMLButtonElement;
    btn.disabled = true;
  };

  return (
    <section className={className}>
      <h2 className="label">User</h2>
      <Card>
        <header>
          <img src={user.avatar} alt="Avatar" />
          <div className="texts">
            <div>{user.name}</div>
            <div>{user.login}</div>
          </div>
          <div className="btns-group">
            <button
              onClick={savingHandler}
              title="Save user data in localstorage"
              disabled={checkSaving()}
            >
              Save
            </button>
            <a
              href={user.url}
              target="_blank"
              rel="noreferrer"
              title="Go to GitHub page"
            >
              GitHub
            </a>
          </div>
        </header>
        <div className="descr">{user.bio}</div>
        <footer>
          <div className="info">
            {user.company ? (
              <div className="company">
                <IoBusiness /> {user.company}
              </div>
            ) : null}
            {user.location ? (
              <div className="location">
                <IoLocationSharp /> {user.location}
              </div>
            ) : null}
            {user.blog ? (
              <a href={`https://${user.blog}`}>
                <IoLinkSharp /> {user.blog}
              </a>
            ) : null}
            {user.twitter ? (
              <div className="company">
                <IoLogoTwitter /> @{user.twitter}
              </div>
            ) : null}
          </div>
          {paintAchievements(achievementsData)}
        </footer>
      </Card>
    </section>
  );
};

const paintAchievements = (
  achievementsData: ReturnType<typeof selectAchievementsData>
) => {
  const [achievements, status] = achievementsData;
  if (status === "initial" || status === "pending") {
    return <Spinner className="spinner" size={45} />;
  }
  if (status === "error" || !achievements) {
    return null;
  }
  return (
    <ul className="achievements">
      {achievements.map((el) => (
        <li key={el.name} title={`Achievement: ${el.name}`}>
          <img src={el.thumbnail} alt={el.name} />
          <span>{el.count}</span>
        </li>
      ))}
    </ul>
  );
};

const Card = styled.div`
  ${blockWithLabel}

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    margin-bottom: var(--offset-md);

    img {
      display: block;
      width: 75px;
      height: 75px;
      border-radius: 100%;

      @media screen and (max-width: 500px) {
        width: 50px;
        height: 50px;
      }
    }

    .texts {
      flex: 1 1 auto;
      margin: 0 var(--offset-md);

      div:first-child {
        font-weight: 700;
        letter-spacing: 2px;
      }

      div:last-child {
        font-weight: 300;
        color: var(--clr-muted);
      }

      div:not(:last-child) {
        margin-bottom: 5px;
      }
    }

    .btns-group {
      display: flex;

      @media screen and (max-width: 600px) {
        flex-direction: column;
      }
    }

    .btns-group * {
      color: var(--clr-primary);
      border: 1px solid var(--clr-primary);
      border-radius: var(--radius-sm);
      padding: 5px 15px;
      font-size: inherit;
      background: none;
      cursor: pointer;
      text-align: center;

      @media screen and (max-width: 600px) {
        width: 100%;
        font-size: 13px;
        padding: 5px 10px;

        &:not(:last-child) {
          margin: 0 0 5px 0;
        }
      }

      &:hover {
        color: var(--clr-muted);
        border-color: var(--clr-muted);
      }

      &:not(:last-child) {
        margin-right: var(--offset-md);
      }

      &:disabled {
        display: none;
      }
    }
  }

  .descr {
    margin-bottom: var(--offset-md);
    flex: 1 1 auto;
  }

  footer {
    font-weight: 300;
    color: var(--clr-muted);
    display: flex;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      > *:not(:last-child) {
        margin-bottom: var(--offset-md);
      }
    }

    .info {
      margin-right: var(--offset-md);

      > * {
        display: flex;
        align-items: center;

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }

      svg {
        margin-right: 10px;
        font-size: 1.2rem;
      }

      a {
        color: var(--clr-primary);
      }
    }

    svg.spinner {
      margin: auto 0 0 auto;
    }

    .achievements {
      list-style: none;
      margin: auto 0 0 auto;

      li {
        display: inline-block;
        position: relative;
        margin-left: 7px;
      }

      img {
        width: 45px;
        height: 45px;
        filter: drop-shadow(0 8px 24px rgba(140, 149, 159, 0.2));
      }

      span {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 2px 4px;
        font-size: 14px;
        background-color: #f3f3f3;
        border: 2px solid #fff;
        border-radius: 10px;
      }
    }
  }
`;

export default styled(UserCard)`
  display: flex;
  flex-direction: column;

  .label {
    ${blockLabel}
  }
`;
