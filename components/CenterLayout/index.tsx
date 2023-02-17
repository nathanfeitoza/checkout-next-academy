import React from "react";
import { Col, Row } from "antd";

export interface CenterLayoutProps {
  children: any;
  span?: number;
  offset?: number;
  className?: string;
}

export const CenterLayout = ({
  children,
  span = 11,
  offset = 7,
  className
}: CenterLayoutProps) => {
  return (
    <Row className="row-center">
      <Col className={className} span={span} offset={offset}>
        {children}
      </Col>
    </Row>
  );
};
