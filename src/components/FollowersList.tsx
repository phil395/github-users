import { FC } from "react";
// external
import styled from "styled-components";
// styles
import { blockLabel, blockWithLabel } from "@styles";
// types
import type { IFollower } from "@models/follower";
//

interface Props {
  list: IFollower[];
  className?: string;
}

const FollowersList: FC<Props> = ({ className, list }) => {
  return (
    <section className={className}>
      <h3 className="label">Followers</h3>
      <ListWrapper>
        {list?.length ? renderList(list) : "No followers"}
      </ListWrapper>
    </section>
  );
};

const renderList = (list: IFollower[]) => (
  <ul>
    {list.map(({ id, avatar, login, url }) => (
      <li key={id}>
        <a href={url} target="_blank" rel="noreferrer">
          <img width={45} height={45} src={avatar} alt={login} loading="lazy" />
          <div>
            <p>{login}</p>
            <span>{url}</span>
          </div>
        </a>
      </li>
    ))}
  </ul>
);

const ListWrapper = styled.div`
  ${blockWithLabel}
  overflow: auto;
  flex: 1 1 200px; //  section min height

  @media screen and (max-width: 1040px) {
    flex: 1 1 270px;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 20px;
    font-size: 0.9rem;

    a {
      display: flex;
      align-items: center;
    }

    a:hover {
      color: var(--clr-primary);
    }

    img {
      margin-right: 15px;
      width: 45px;
      height: 45px;
      border-radius: 100%;
    }

    p {
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 3px;
    }

    span {
      font-weight: 300;
      color: var(--clr-muted);
    }
  }
`;

export default styled(FollowersList)`
  display: flex;
  flex-direction: column;

  .label {
    ${blockLabel}
  }
`;
