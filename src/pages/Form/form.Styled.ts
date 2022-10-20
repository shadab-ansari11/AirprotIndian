import styled from "styled-components";

export const LabelContainer = styled.div`

`;

export const LabelTag = styled.p`
 font-weight: bold;
 font-size: 18px;
`;

export const InputField = styled.input`
 width: 100%;
 padding: 15px;
 border: 1px solid #000;
 border-radius: 3px;
`;

export const DropdownContainer = styled.ul` background-color: #fff;
border-radius: 5px;
margin: 0;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
height: auto;
margin-bottom: 10px;
position: absolute;
width: 72%;
z-index: 1;
@media screen and (min-width: 1200px) {
  width: 260px;
  z-index: 1;
}`;

export const Dropdown = styled.li`
  font: normal normal 600 22px/30px Segoe UI;
  cursor: pointer;
  list-style-type: none;
  margin-bottom: 5px;
  font-size: 18px;
`;



