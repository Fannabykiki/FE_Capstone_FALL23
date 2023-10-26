import { Col, Input, Pagination, Row, Select } from "antd";
import styled from "styled-components";

export const DashboardStyled = styled.div`
  padding: 20px 20px 20px 50px;
  min-height: calc(100vh - 110px);
  background-color: #f8f8f8;
`;

export const SelectProjectStyled = styled(Select)`
  margin-left: 10px;
  min-width: 200px;
`;

export const DonutChartStyled = styled(Col)`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const LineChartStyled = styled(Col)`
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const TableWrapper = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const WrapperSearch = styled(Row)`
  margin: 10px 0;
`;

export const InputStyled = styled(Input)`
  margin-left: 10px;
  width: 200px;
`;

export const SelectStatusStyled = styled(Select)`
  margin-left: 10px;
  width: 150px;
`;

export const PaginationStyled = styled(Pagination)`
  text-align: center;
  margin: 10px 0;
`;
