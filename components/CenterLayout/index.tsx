import React from "react";
import { Col, Row } from "antd";

export const CenterLayout = ({ children }: {children: any}) => {
  return (
    <Row className="row-center">
      <Col span={11} offset={7}>
        { children }
      </Col>
    </Row>
  )
}
