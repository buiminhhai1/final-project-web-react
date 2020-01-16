import React from 'react';
// import { Container } from 'react-bootstrap';
import './verifyRequest.css';

export default function verifyRequest() {
  return (
    <div className="container verify-announcement pt-3 pl-5">
      <h4 className="mb-3">
        <b>Help us keep your account safe with a security check</b>
      </h4>
      <br />
      <h6>Hello {localStorage.getItem('userName')},</h6>
      <h6>
        Please verify your account at this email:{' '}
        <i>
          <b> {localStorage.getItem('email')}</b>
        </i>
      </h6>
      <br />
      <h6>Regards,</h6>
      <h6>Tutor Recommendation team</h6>
    </div>
  );
}
