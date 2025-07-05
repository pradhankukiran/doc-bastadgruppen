import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import { DeclarationFormData } from "../types";
import LatoRegular from "/fonts/Lato-Regular.ttf";
import LatoBold from "/fonts/Lato-Bold.ttf";

// Disable automatic word splitting/hyphenation
Font.registerHyphenationCallback((word) => [word]);

// Register the Lato font
Font.register({
  family: "Lato",
  fonts: [{ src: LatoRegular }, { src: LatoBold, fontWeight: "bold" }],
});

type Props = {
  formData: DeclarationFormData;
  language: string;
};

const DocPdfTemplate: React.FC<Props> = ({ formData, language }) => {
  const { productInfo, selectedBodyDetails, complianceInfo } = formData;

  const finalProductInfo = {
    ...productInfo,
    moduleType:
      productInfo.categoryClass === "Class II"
        ? "Module B"
        : productInfo.moduleType,
  };

  return (
    <Document title={`DoC_${finalProductInfo.name}_${language}`}>
      <Page
        size="A4"
        style={{
          fontSize: 12,
          paddingTop: 120,
          paddingBottom: 10,
          paddingHorizontal: 60,
          fontFamily: "Lato",
          lineHeight: 1.5,
        }}
        wrap
      >
        {/* Title & Category */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: 14,
              height: 33,
              backgroundColor: "black",
              marginRight: 7,
              marginTop: -5,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 17,
                textAlign: "left",
                marginBottom: 7,
              }}
            >
              EU Declaration of Conformity
            </Text>
            {finalProductInfo.categoryClass && (
              <Text
                style={{
                  fontSize: 10,
                  textAlign: "left",
                }}
              >
                {finalProductInfo.categoryClass === "Class II" ||
                finalProductInfo.categoryClass === "Class III"
                  ? `${finalProductInfo.categoryClass.replace(
                      "Class",
                      "Category"
                    )} - ${finalProductInfo.moduleType}`
                  : finalProductInfo.categoryClass.replace("Class", "Category")}
              </Text>
            )}
          </View>
        </View>

        {/* Responsibility statement & manufacturer address */}
        <View
          style={{
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            This declaration of conformity is issued under the sole
            responsibility of the manufacturer:
          </Text>
          <Text style={{ fontSize: 12 }}>Båstadgruppen AB</Text>
          <Text style={{ fontSize: 12 }}>Fraktgatan 1</Text>
          <Text style={{ fontSize: 12 }}>262 73 Ängelholm</Text>
          <Text style={{ fontSize: 12 }}>Sweden</Text>
        </View>
        {/* Declaration statement */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{ fontSize: 12, textAlign: "center", paddingHorizontal: 70 }}
          >
            The manufacturer hereby declares that the below-described Personal
            Protective Equipment (PPE):
          </Text>
        </View>

        {/* Product information */}
        <View style={{ marginBottom: 12, textAlign: "center" }}>
          <Text style={{ fontSize: 17, marginBottom: 10 }}>
            {finalProductInfo.name}
          </Text>
          <Text style={{ fontSize: 13 }}>
            with item number {finalProductInfo.productNumber}
          </Text>
        </View>

        {/* Legislation and Standards */}
        <View style={{ marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 10,
              textAlign: "justify",
            }}
          >
            is in conformity with the relevant Union harmonisation legislation:{" "}
            {complianceInfo.euLegislation.join(", ")} and fulfills the
            applicable essential health and safety requirements set out in Annex
            II and the relevant harmonized standards or other technical
            specifications, No. :
          </Text>
          {complianceInfo.harmonisedStandards.map((std, idx) => (
            <Text
              key={idx}
              style={{
                fontSize: 12,
                marginLeft: 12,
                marginBottom: 10,
              }}
            >
              • {std}
            </Text>
          ))}
        </View>

        {/* Notified statement */}
        {selectedBodyDetails &&
          finalProductInfo.categoryClass !== "Class I" && (
            <View style={{ marginBottom: 15 }}>
              {finalProductInfo.categoryClass === "Class III" &&
              finalProductInfo.moduleType === "Module C2" ? (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "justify",
                    marginBottom: 10,
                  }}
                >
                  {`The notified body "${selectedBodyDetails.name} (No ${selectedBodyDetails.number})" performed the EU type-examination (Module B) and issued the EU type-examination certificate "${finalProductInfo.certificateNo}". The PPE is subject to the conformity assessment procedure based on internal production control plus supervised product checks at random intervals (Module C2) under surveillance of the notified body "${selectedBodyDetails.name} (No ${selectedBodyDetails.number})".`}
                </Text>
              ) : finalProductInfo.categoryClass === "Class III" &&
                finalProductInfo.moduleType === "Module D" ? (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "justify",
                    marginBottom: 10,
                  }}
                >
                  {`The notified body "${selectedBodyDetails.name} (No ${selectedBodyDetails.number})" performed the EU type-examination (Module B) and issued the EU type-examination certificate "${finalProductInfo.certificateNo}". The PPE is subject to the conformity assessment procedure based on quality assurance of the production process (Module D) under surveillance of the notified body "${selectedBodyDetails.name} (No ${selectedBodyDetails.number})".`}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "justify",
                    marginBottom: 10,
                  }}
                >
                  {`The notified body "${selectedBodyDetails.name} (No ${selectedBodyDetails.number})" performed the EU type-examination (${finalProductInfo.moduleType}) and issued the EU type-examination certificate "${finalProductInfo.certificateNo}".`}
                </Text>
              )}
            </View>
          )}
        {/* Notified Address */}
        {selectedBodyDetails && (
          <View>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
              {selectedBodyDetails.name}
            </Text>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
              Notified Body No. {selectedBodyDetails.number}
            </Text>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
              {selectedBodyDetails.address}
            </Text>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
              {selectedBodyDetails.zipCode}, {selectedBodyDetails.country}
            </Text>
          </View>
        )}

        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            bottom: 30,
            left: 40,
            right: 40,
            fontSize: 10,
            color: "grey",
          }}
          fixed
        >
          <Text>www.bastadgruppen.com</Text>
          <Text>Båstadgruppen AB</Text>
          <Text>+46 410 70 00 00</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocPdfTemplate;
