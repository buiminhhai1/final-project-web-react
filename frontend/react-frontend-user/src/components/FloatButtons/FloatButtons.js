import React from 'react';

import { Container, Button } from 'react-floating-action-button';
import './FloatButtons.css';

export default function FloatButtons(props) {
  return (
    <Container>
      <Button
        onClick={() => { props.setChatVisible() }}
        className="support-btn  btn-lg text-white"
        tooltip="Chat with this teacher"
        icon="fas fa-comments"
      />
      <Button
        onClick={() => { props.setHireVisible() }}
        className="btn-lg text-white"
        tooltip="Hire this teacher"
        rotate={true}
        icon="fas fa-handshake fa-lg"
      />
    </Container>
  );
}
