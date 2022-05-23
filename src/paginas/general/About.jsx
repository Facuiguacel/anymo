import React from "react";
import { Jumbotron as Jumbo } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .h-divider {
    margin-top: 5px;
    margin-bottom: 5px;
    height: 1px;
    width: 100%;
    border-top: 2px solid rgba(0, 0, 0, 0.6);
  }

  .container {
    justify-content: center;
  }
  .jumbo {
    background-color: rgba(250, 120, 15, 0.05);
  }
`;

//import img1 from "../assets/luna.jpg";
//import img2 from "../assets/Lamona.jpg"
//import {Button} from 'react-bootstrap';

export const About = () => (
  <div>
    <Styles>
      <div className="container">
        <div className="h-divider"> </div>
        <Jumbo className="jumbo mb-0">
          <h1> ¿𝓟𝓸𝓻𝓺𝓾𝓮 𝓮𝓵𝓮𝓳𝓲𝓻𝓷𝓸𝓼 ?</h1>
          <h1>
            {" "}
            𝙂𝙧𝙖𝙘𝙞𝙖𝙨 𝙖 𝙣𝙪𝙚𝙨𝙩𝙧𝙖 𝙚𝙨𝙩𝙧𝙖𝙩𝙚𝙜𝙞𝙖 𝙙𝙚 𝙫𝙚𝙣𝙩𝙖 𝙫𝙖𝙨 𝙖 𝙚𝙣𝙘𝙤𝙣𝙩𝙧𝙖𝙧 𝙢𝙤𝙢𝙚𝙣𝙩𝙤𝙨 𝙘𝙤𝙣 𝙣𝙖 𝙩𝙚𝙢𝙖́𝙩𝙞𝙘𝙖 𝙥𝙧𝙚𝙙𝙚𝙛𝙞𝙣𝙞𝙙𝙖 𝙦𝙪𝙚 𝙥𝙚𝙧𝙢𝙞𝙩𝙚 𝙦𝙪𝙚
            𝙤𝙗𝙩𝙚𝙣𝙜𝙖𝙨 𝙥𝙧𝙤𝙙𝙪𝙘𝙩𝙤𝙨 𝙖 𝙢𝙪𝙮 𝙪𝙚𝙣 𝙥𝙧𝙚𝙘𝙞𝙤 𝙥𝙚𝙣𝙨𝙖𝙙𝙤𝙨 𝙥𝙖𝙧𝙖 𝙤𝙛𝙧𝙚𝙘𝙚𝙧𝙩𝙚 𝙡𝙖 𝙢𝙚𝙟𝙤𝙧 𝙚𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 𝙥𝙤𝙨𝙞𝙗𝙡𝙚 𝙖 𝙡𝙖 𝙝𝙤𝙧𝙖 𝙙𝙚
            𝙖𝙙𝙦𝙪𝙞𝙧𝙞𝙧 𝙣𝙪𝙚𝙨𝙩𝙧𝙤 𝙨𝙚𝙧𝙫𝙞𝙘𝙞𝙤.{" "}
          </h1>
        </Jumbo>
        <div className="h-divider"> </div>
      </div>
      <div className="container">
        <Jumbo className="jumbo mb-0">
          <h1> 𝓒𝓸𝓷𝓽𝓪𝓬𝓽𝓪𝓷𝓸𝓼 𝓹𝓪𝓻𝓪 𝓿𝓮𝓷𝓭𝓮𝓻 𝓮𝓷 𝓷𝓾𝓮𝓼𝓽𝓻𝓪 𝓹𝓵𝓪𝓽𝓪𝓯𝓸𝓻𝓶𝓪</h1>
          <h1>𝙋𝙖𝙜𝙞𝙣𝙖 𝙙𝙚 𝙛𝙖𝙘𝙚𝙗𝙤𝙤𝙠 :𝘿𝙞𝙫𝙚 𝙞𝙣 𝙩𝙚𝙢𝙥𝙤𝙧𝙚 </h1>
          <h1>𝙈𝙖𝙞𝙡 : 𝘿𝙞𝙫𝙚𝙄𝙣𝙏𝙚𝙢𝙥𝙤𝙧𝙚@𝙝𝙤𝙩𝙢𝙖𝙞𝙡.𝙘𝙤𝙢</h1>
          <h1>𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 : 𝘿𝙞𝙫𝙚𝙄𝙣𝙏𝙚𝙢𝙥𝙤𝙧𝙚</h1>
        </Jumbo>
        <div className="h-divider"> </div>
      </div>
    </Styles>
  </div>
);
