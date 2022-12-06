import { FC, useEffect } from "react";
// external
import styled from "styled-components";
// components
import {
  Search,
  StatBlock,
  UserCard,
  FollowersList,
  Spinner,
  Table,
  Graph,
  Limit,
} from "@components";
import {
  LanguagesChart,
  StarsChart,
  ReposChart,
  HeatmapChart,
} from "@charts";
// hooks
import { useActions, useAppSelector, useMatchMedia } from "@hooks";

const DEFAULT_USER = 'trey';

const Dashboard: FC = () => {
  const { getUserData } = useActions();
  const { data: user, status } = useAppSelector((state) => state.api);
  const apiStatus = useAppSelector((state) => state.api.status);
  const isMobile = useMatchMedia("(max-width: 430px)");

  useEffect(() => {
    if (apiStatus === "initial") getUserData(DEFAULT_USER);
  }, []);


  if (!user) return <Spinner size={200} center />;

  const { followers, following, gists, repos } = user;

  return (
    <Root>
      <Search />
      <Limit />

      {status === "pending" ? (
        <Spinner size={120} center />
      ) : (
        <>
          <StatBlock stats={{ followers, following, gists, repos }} />
          <UserCard user={user} />
          <FollowersList list={user.followersList} />
          <LanguagesChart languages={user.languagesData} isMobile={isMobile} />
          <StarsChart languages={user.languagesData} isMobile={isMobile} />
          <ReposChart sortedList={user.sortedRepos} />
          <Graph isMobile={isMobile} />
          <HeatmapChart />
          <Table />
        </>
      )}
    </Root>
  );
};

const Root = styled.main`
  display: grid;
  gap: var(--grid-gap);
  padding: var(--offset-md) 0;

  grid-template:
    ". search search limit ." auto
    ". stats stats stats ." auto
    ". card card followers ." auto
    ". stars languages languages ." auto
    ". graph graph graph ." auto
    ". repos repos heatmap ." auto
    ". table table table ." auto
    / auto minmax(0px, 480px) minmax(0px, 320px) minmax(0px, 480px) auto;

  @media screen and (max-width: 1040px) {
    --column-gap: 10px;
    column-gap: var(--column-gap);

    grid-template:
      ". limit ." auto
      ". search ." auto
      ". stats ." auto
      ". card ." auto
      ". followers ." auto
      ". stars ." auto
      ". languages ."
      ". graph ." auto
      ". repos ." auto
      ". heatmap ."
      ". table ." auto
      / auto calc(100% - var(--column-gap) * 2) auto;
  }


  ${Search} {
    grid-area: search;
  }

  ${Limit} {
    grid-area: limit;
  }

  ${StatBlock} {
    grid-area: stats;
  }

  ${UserCard} {
    grid-area: card;
  }

  ${FollowersList} {
    grid-area: followers;
  }

  ${StarsChart} {
    grid-area: stars;

    .chart {
      height: 300px;
      @media screen and (max-width: 500px) {
        height: calc(250px + 2vw);
      }
    }
  }

  ${LanguagesChart} {
    grid-area: languages;

    .chart {
      height: 400px;
      @media screen and (max-width: 600px) {
        height: calc(250px + 2vw);
      }
      @media screen and (max-width: 420px) {
        height: calc(200px + 2vw);
      }
    }
  }

  ${Graph} {
    grid-area: graph;
  }

  ${ReposChart} {
    grid-area: repos;
    .chart {
      height: 400px;
    }
  }

  ${HeatmapChart} {
    grid-area: heatmap;
  }

  ${Table} {
    grid-area: table;
  }
`;

export default Dashboard;
