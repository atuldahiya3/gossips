import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColour } from "../constants/colour";

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });


export const StyledLink = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: 1rem;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const InputBox=styled("input")`
font-size:20px;
width:100%;
height:70%;
border:solid;
outline:none;
padding: 0 3rem;
border-radius:1.5rem;

overflow-x: auto;
overflow-y: auto;
`