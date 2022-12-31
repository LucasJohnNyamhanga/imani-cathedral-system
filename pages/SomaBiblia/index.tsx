import React, { useContext, useEffect } from "react";
import { NavContext } from "../../components/context/StateContext";
import axios from "axios";

const SomaBiblia = () => {
  const { navActive, setNavActive } = useContext(NavContext);
  const API_KEY = `4b99ad55013a8f3be63090fb85f7050e`;
  const url =
    "https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books?include-chapters=true&include-chapters-and-sections=true";
  const config = {
    headers: {
      "api-key": API_KEY,
    },
  };

  useEffect(() => {
    setNavActive("Biblia");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  const handleBiblia = () => {
    console.log("initialized");
    axios
      .get(url, config)
      .then(function (response) {
        //responce
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return <div onClick={handleBiblia}>SomaBiblia</div>;
};

export default SomaBiblia;
