import React, { useState, useEffect } from "react";
import ajax from "ajax";
import axios from "axios";
var XMLParser = require("react-xml-parser");

const href = "https://video.google.com/timedtext?v=Q9XD8yRPxc8&lang=en";

const getTranscript = () => {
  axios.get(href).then(res => {
    var xml = new XMLParser().parseFromString(res.data);
    console.log(xml);
  });
};
export default getTranscript;
