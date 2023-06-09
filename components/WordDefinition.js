import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";

const WordDefinition = ({ data }) => {
  const Root = styled(Card)({
    width: "30%",
    margin: "auto",
    marginTop: "9rem",
    backgroundColor: "#f0f0f0",
    boxShadow: "none",
  });

  const Header = styled(CardHeader)({
    textAlign: "center",
  });

  const Content = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0",
    paddingBottom: "1rem",
  });

  const Image = styled(CardMedia)({
    width: "200px",
    height: "200px",
    objectFit: "contain",
    margin: "0.5rem",
  });

  console.log(data);

  return (
    <Root>
      <Header />
      <Content>
        <Typography variant="body1" component="p">
          {data && data.length > 0 ? (
            data.map((x , index) => {
              return (
                <div key={uuidv4()}>
                  
                  {x.definition ? (
                    <p>{index + 1} - {x.definition}</p>
                  ) : (
                    <p>No definition available</p>
                  )}
                </div>
              );
            })
          ) : (
            <h1>No data</h1>
          )}
        </Typography>
      </Content>
    </Root>
  );
};

export default WordDefinition;
