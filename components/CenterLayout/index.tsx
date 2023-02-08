import React from "react";
import { Col, Row } from "antd";

export interface CenterLayoutProps {
  children: any;
  span?: number;
  offset?: number;
}

export const CenterLayout = ({
  children,
  span = 11,
  offset = 7,
}: CenterLayoutProps) => {
  return (
    <Row className="row-center">
      <Col span={span} offset={offset}>
        {children}
      </Col>
    </Row>
  );
};
