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
import { Blogs, News, Reels } from "../Components/Trending";
import AdminPage from "../Components/Admin";
import Pages from "../Components/Pages";
import Auth from "../Components/Auth";
import OfferGallery from "../Components/OfferGallery";
import { Col, Row } from "antd";
import img from "../assets/WhatsApp Image 2025-01-18 at 2.08.04 AM.jpeg";
import img2 from "../assets/Payment Methods Icon Png.png";

interface RouteBase {
  path: string;
  element: ReactNode;
}

export const proctectedRoutes: RouteBase[] = [
  {
    path: "/admin",
    element: <AdminPage></AdminPage>,
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
        <OfferGallery></OfferGallery>
        <GameGallery></GameGallery>
        <CasinoGallery></CasinoGallery>
        <Row style={{ width: "100%", height: "100%" }}>
          <img
            style={{ width: "100%", borderRadius: "3vh", height: "100%" }}
            src={img}
          ></img>
        </Row>
        <Row
          style={{
            width: "100%",
            height: "100%",
            margin: "3vh 3vh",
            marginTop: "3vh",
            color: "white",
            fontFamily: "Popins",
          }}
          justify={"center"}
        >
          <Col>
            <h3 style={{fontFamily:"Popins"}}>NO STRESS DEPOSITS</h3>
          </Col>
          <Col style={{marginTop:"2vh" , fontFamily:"Popins"}}>
            We accept most major payment methods and work with some of the most
            trusted payments companies in the world.
          </Col>
          <img style={{ width: "90%", height: "100%" , marginRight:"1vw" }} src={img2}></img>
        </Row>

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
        <OfferGallery></OfferGallery>
        <GameGallery></GameGallery>
        <CasinoGallery></CasinoGallery>
        <Row style={{ width: "100%", height: "100%" }}>
          <img
            style={{ width: "100%", borderRadius: "3vh", height: "100%" }}
            src={img}
          ></img>
        </Row>
        <Row
          style={{
            width: "100%",
            height: "100%",
            margin: "3vh 3vh",
            marginTop: "3vh",
          }}
        >
          <img style={{ width: "90%", height: "100%" }} src={img2}></img>
        </Row>
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
    element: (
      <>
        <CricketSection></CricketSection>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "cricket/:id",
    element: (
      <>
        <MatchPage apiurl={"https://data.shamexch.xyz/getbm"}></MatchPage>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "games/:id",
    element: (
      <>
        <MatchPage
          apiurl={"https://pro.shamexch.xyz/getdatasports"}
        ></MatchPage>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "soccer",
    element: (
      <>
        <SoccerSection></SoccerSection>,<Footer></Footer>
      </>
    ),
  },
  {
    path: "tennis",
    element: (
      <>
        <TennisSection></TennisSection>,<Footer></Footer>
      </>
    ),
  },
  {
    path: "horse-racing",
    element: (
      <>
        <HorseRidding></HorseRidding>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "news",
    element: (
      <>
        <News></News>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "blogs",
    element: (
      <>
        <Blogs></Blogs>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "reels",
    element: (
      <>
        <Reels></Reels>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: "/pages",
    element: <Pages></Pages>,
  },
  {
    path: "/auth",
    element: <Auth></Auth>,
  },
];
