import React from 'react';

import { Container, Button } from 'react-floating-action-button';
import './FloatButtons.css';

export default function FloatButtons(props) {
  return (
    <Container>
      <Button
        onClick={() => {props.setChatVisible()}}
        tooltip="Chat with this teacher"
        icon="fas fa-comments"
      />
      <Button
        onClick={() => {props.setHireVisible()}}
        tooltip="Hire this teacher"
        icon="fas fa-user-plus"
      />
      <Button
        tooltip="Contact with this teacher"
        className="fab-item btn btn-link btn-lg text-white"
        icon="fas fa-phone"
        rotate={true}
      />
    </Container>
  );
}
