import React, { useState } from "react";
import Faq from "react-faq-component";
import Layout from "../../components/layout/layout";

import "./faq.scss";

function FaqSite() {
  const staffData = {
    title: "FAQ Pracownik",
    rows: [
      {
        title: "Jak zgłośić się na zmianę?",
        content: "Lorem ipsum dolor sit amet, consectetur ",
      },
      {
        title: "Kiedy moje zgłoszenie zostało przyjętę?",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
      },
      {
        title: "Jak raportować godziny pracy?",
        content:
          "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
      },
      {
        title: "Zmiana hasła",
        content: "v1.0.5",
      },
    ],
  };

  const adminData = {
    title: "FAQ Administartor",
    rows: [
      {
        title: "Jak dodać nowego pracownika?",
        content: "Lorem ipsum dolor sit amet, consectetur ",
      },
      {
        title: "Jak dodać nową zmianę?",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
      },
      {
        title: "Akceptowanie użytkownika na konkretną zmianę",
        content:
          "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
      },
      {
        title: "Wypłaty pracowników",
        content: "v1.0.5",
      },
      {
        title: "Zmiana hasła",
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
    <Layout title="Najczęsciej zadawane pytania">
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
