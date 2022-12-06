// external
import { GoRepo, GoGist } from "react-icons/go";
import { IoPeopleOutline, IoPersonAddOutline } from "react-icons/io5";
// types
import { StatNames } from "@models/stats";
//

interface IIcon {
  svg: JSX.Element;
  color: string;
  bgColor: string;
}

interface IStatBlock {
  label: StatNames;
  value?: number;
  icon: IIcon;
}

const data: IStatBlock[] = [
  {
    label: "repos",
    value: undefined,
    icon: {
      svg: <GoRepo />,
      color: "rgb(218, 74, 145)",
      bgColor: "rgb(255, 224, 240)",
    },
  },
  {
    label: "followers",
    value: undefined,
    icon: {
      svg: <IoPeopleOutline />,
      color: "rgb(44, 174, 186)",
      bgColor: "rgb(224, 252, 255)",
    },
  },
  {
    label: "following",
    value: undefined,
    icon: {
      svg: <IoPersonAddOutline />,
      color: "rgb(93, 85, 250)",
      bgColor: "rgb(230, 230, 255)",
    },
  },
  {
    label: "gists",
    value: undefined,
    icon: {
      svg: <GoGist />,
      color: "rgb(240, 180, 41)",
      bgColor: "rgb(255, 251, 234)",
    },
  },
];

export type { IStatBlock };

export default data;
