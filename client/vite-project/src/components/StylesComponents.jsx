import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

export const VirtuallyHiddenIcon=styled("input")({

})


export const StyledLink = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: 1rem;

    &:hover {
        background-color: #f0f0f0;
    }
`;