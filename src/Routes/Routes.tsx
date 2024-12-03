import { ReactNode } from "react";
import CricketSection from "../Components/Tabs/Cricket";
import SoccerSection from "../Components/Tabs/Soccer";
import TennisSection from "../Components/Tabs/Tennis";
import HorseRidding from "../Components/Tabs/HorseRidding";
import Footer from "../Components/Footer";
import GameGallery from "../Components/GameGallery";
import CasinoGallery from "../Components/CasinoGallery";
import SliderComponent from "../Components/Slider";
import MatchPage from "../Components/MatchPage";

interface RouteBase {
  path: string;
  element: ReactNode;
}

interface ProctectedRoutes extends RouteBase {
  roles: string[];
}

export const proctectedRoutes: ProctectedRoutes[] = [
  {
    path: "/",
    element: <></>,
    roles: [],
  },
];

export const globalRoutes = [
  {
    path: "",
    element: (
      <>
        <SliderComponent></SliderComponent>
        <CricketSection></CricketSection>
        <SoccerSection></SoccerSection>
        <TennisSection></TennisSection>
        <HorseRidding></HorseRidding>
        <GameGallery></GameGallery>
        <CasinoGallery></CasinoGallery>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "home",
    element: (
      <>
        <SliderComponent></SliderComponent>
        <CricketSection></CricketSection>
        <SoccerSection></SoccerSection>
        <TennisSection></TennisSection>
        <HorseRidding></HorseRidding>
        <GameGallery></GameGallery>
        <CasinoGallery></CasinoGallery>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "in-play",
    element: (
      <>
        <CricketSection></CricketSection>
        <SoccerSection></SoccerSection>
        <TennisSection></TennisSection>
        <HorseRidding></HorseRidding>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "cricket",
    element: <>
      <CricketSection></CricketSection>
      <Footer></Footer>
    </>
  },
  {
    path: "cricket/:id",
    element: <>
      <MatchPage apiurl={"https://data.shamexch.xyz/getbm"}></MatchPage>
      <Footer></Footer>
    </>
  },
  {
    path: "games/:id",
    element: <>
      <MatchPage apiurl={"https://pro.shamexch.xyz/getdatasports"}></MatchPage>
      <Footer></Footer>
    </>
  },
  {
    path: "soccer",
    element:
      <>
        <SoccerSection></SoccerSection>,
        <Footer></Footer>
      </>
  },
  {
    path: "tennis",
    element:
      <>
        <TennisSection></TennisSection>,
        <Footer></Footer>
      </>
  },
  {
    path: "horse-racing",
    element:
      <>
        <HorseRidding></HorseRidding>
        <Footer></Footer>
      </>
  },
];
