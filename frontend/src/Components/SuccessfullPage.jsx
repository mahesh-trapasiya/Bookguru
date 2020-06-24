import { Result, Button } from "antd";
import React from "react";
import { navigate } from "@reach/router";
function SuccessPage() {
  return (
    <Result
      status="success"
      title="Account Created And Verified SuccessFully"
      subTitle="Have A Great Reading Experience !!Please Login .If You Re a Writer You need To Add Your First Book For Futher Using "
      extra={[
        <Button type="primary" key="console" onClick={() => navigate("/login")}>
          Login Here
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  );
}
export default SuccessPage;
