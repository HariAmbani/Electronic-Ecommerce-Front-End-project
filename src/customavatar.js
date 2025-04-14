import React from 'react';
import styled from 'styled-components';

// Styled Components for the Avatar and Hover Info
const Circle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  position: relative;

  &:hover .hover-info {
    opacity: 1;
    visibility: visible;
  }
`;

const HoverInfo = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
`;

// Custom Avatar Component
const CustomAvatar = ({ userData }) => {
  return (
    <Circle>
      {userData.name ? userData.name[0].toUpperCase() : "U"}
      <HoverInfo className="hover-info">
        {userData.fullName} - {userData.role}
      </HoverInfo>
    </Circle>
  );
};

export default CustomAvatar;
