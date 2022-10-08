import React, { useState } from "react";
import Faq from "react-faq-component";
import Layout from "../../components/layout/layout";

import "./faq.scss";

function FaqSite() {
  const staffData = {
    title: "FAQ Pracownik",
    rows: [
      {
        title: "Lorem ipsum dolor sit amet,",
        content: "Lorem ipsum dolor sit amet, consectetur ",
      },
      {
        title: "Nunc maximus, magna at ultricies elementum",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
      },
      {
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        content:
          "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
      },
      {
        title: "What is the package version",
        content: "v1.0.5",
      },
    ],
  };

  const adminData = {
    title: "FAQ Administartor",
    rows: [
      {
        title: "Lorem ipsum dolor sit amet 2,",
        content: "Lorem ipsum dolor sit amet, consectetur ",
      },
      {
        title: "Nunc maximus, magna at ultricies elementum",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
      },
      {
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        content:
          "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
      },
      {
        title: "What is the package version",
        content: "v1.0.5",
      },
    ],
  };
  const [data, setData] = useState(staffData);

  const adminButtonHandler = () => {
    setData(adminData);
  };
  const staffButtonHandler = () => {
    setData(staffData);
  };
  const isActive = (activeData) => {
    return data.title === activeData.title;
  };
  return (
    <Layout title="FAQ">
      <div className="faqContainer">
        <div className="faqContainer__buttonContainer">
          <button
            className={`faqContainer__buttonContainer__button ${
              isActive(staffData) ? "faqActive" : ""
            }`}
            onClick={staffButtonHandler}
          >
            Pracownik
          </button>
          <button
            className={`faqContainer__buttonContainer__button ${
              isActive(adminData) ? "faqActive" : ""
            }`}
            onClick={adminButtonHandler}
          >
            Administrator
          </button>
        </div>
        <Faq
          data={data}
          styles={{
            titleTextColor: "#758bff",
            rowTitleColor: "#758bff",
            rowTitleTextSize: "large",
            rowContentColor: "#48484a",
            rowContentTextSize: "16px",
            rowContentPaddingTop: "10px",
            rowContentPaddingBottom: "10px",
            rowContentPaddingLeft: "50px",
            rowContentPaddingRight: "150px",
            arrowColor: "#758bff",
          }}
        />
      </div>
    </Layout>
  );
}

export default FaqSite;
