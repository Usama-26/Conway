import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface Props {
  validationLink: string;
}

const baseUrl = process.env.APP_URL;

export const VerificationEmail = ({validationLink}: Props) => (
  <Html>
    <Head />
    <Preview>Email verificatiopn</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/images/logo.png`}
          width="42"
          height="42"
          alt="Conway Machine"
          style={logo}
        />
        <Heading style={heading}>Verify email link for Conway Machine</Heading>
        <Section style={buttonContainer}>
          <Button pY={11} pX={23} style={button} href={validationLink}>
            Verify email
          </Button>
        </Section>
        <Text style={paragraph}>
          This link will only be valid for the next 24 hours. If the link does
          not work, you can copy and paste the link directly in your browser:
        </Text>
        <Link href={validationLink} style={link}>
          {validationLink}
        </Link>
        <Hr style={hr} />
        <Link href={baseUrl} style={reportLink}>
          Conway Machine
        </Link>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};

const buttonContainer = {
  padding: '27px 0 27px',
};

const button = {
  backgroundColor: '#1651b0',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc',
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px',
};

const link = {
  fontFamily: 'monospace',
  fontWeight: '700',
  padding: '1px 4px',
  backgroundColor: '#dfe1e4',
  letterSpacing: '-0.3px',
  fontSize: '15px',
  borderRadius: '4px',
  color: '#3c4149',
};
