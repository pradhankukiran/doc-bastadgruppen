import React from "react";
import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";
import { t } from "../i18n";
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

  // Map brand names (as stored in form data) to image paths in the public folder
  const brandLogoMap: Record<string, string> = {
    Guardio: "/Guardio.jpg",
    Matterhorn: "/Matterhorn.jpg",
    Monitor: "/Monitor.jpg",
    "Top Swede": "/Top_Swede.jpg",
    "South West": "/South_West.jpg",
  };

  const brandLogoSrc = brandLogoMap[formData.selectedBrands] || null;

  // Map brand names to signature image paths
  const signatureMap: Record<string, string> = {
    Guardio: "/Nawar.jpg",
    Monitor: "/Ove.jpg",
    Matterhorn: "/Catrin.jpg",
    "Top Swede": "/Kristin.jpg",
    "South West": "/Helena.jpg",
  };

  const signatureSrc = signatureMap[formData.selectedBrands] || null;

  const nameMap: Record<string, string> = {
    Guardio: "Nawar Toma",
    Monitor: "Ove Nilsson",
    Matterhorn: "Catrin Ogenvall",
    "Top Swede": "Kristin Hallbäck",
    "South West": "Helena Rydberg",
  };

  const signerName = nameMap[formData.selectedBrands] || "";

  // Format current date as "dd mm yyyy"
  const formattedDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    ;

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
          paddingTop: 100,
          paddingBottom: 10,
          paddingHorizontal: 60,
          fontFamily: "Lato",
          lineHeight: 1.5,
        }}
        wrap
      >
        <Image
          src="/Bastadgruppen_Logotyp_Svart_RGB.jpg"
          style={{ width: 130, position: "absolute", top: 40, right: 60 }}
          fixed
        />
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
              {t(language, "title.declaration")}
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
            {t(language, "responsibility.statement")}
          </Text>
          <Text style={{ fontSize: 12 }}>Båstadgruppen AB</Text>
          <Text style={{ fontSize: 12 }}>Fraktgatan 1</Text>
          <Text style={{ fontSize: 12 }}>262 73 Ängelholm</Text>
          <Text style={{ fontSize: 12 }}>Sweden</Text>
        </View>
        {/* Declaration statement */}
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{ fontSize: 12, textAlign: "center", paddingHorizontal: 70 }}
          >
            {t(language, "declares.ppe")}
          </Text>
        </View>

        {/* Selected brand logo */}
        {brandLogoSrc && (
          <View style={{ marginBottom: 10, textAlign: "center" }}>
            <Image
              src={brandLogoSrc}
              style={{ width: 100, alignSelf: "center" }}
              fixed
            />
          </View>
        )}

        {/* Product information */}
        <View style={{ marginBottom: 12, textAlign: "center" }}>
          <Text style={{ fontSize: 17, marginBottom: 10 }}>
            {finalProductInfo.name}
          </Text>
          <Text style={{ fontSize: 13 }}>
            {t(language, "product.itemNumber", {
              productNumber: finalProductInfo.productNumber,
            })}
          </Text>
        </View>

        {/* Legislation and Standards */}
        <View style={{ marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 11,
              marginBottom: 10,
              textAlign: "justify",
            }}
          >
            {t(language, "conformity.statement", {
              euLegislation: complianceInfo.euLegislation.join(", "),
            })}
          </Text>
          {complianceInfo.harmonisedStandards.map((std, idx) => (
            <Text
              key={idx}
              style={{
                fontSize: 11,
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
            <View style={{ marginBottom: 10 }}>
              {finalProductInfo.categoryClass === "Class III" &&
              finalProductInfo.moduleType === "Module C2" ? (
                <Text
                  style={{
                    fontSize: 11,
                    textAlign: "justify",
                    marginBottom: 10,
                  }}
                >
                  {t(language, "notified.moduleC2", {
                    bodyName: selectedBodyDetails.name,
                    bodyNumber: selectedBodyDetails.number,
                    certificateNo: finalProductInfo.certificateNo,
                  })}
                </Text>
              ) : finalProductInfo.categoryClass === "Class III" &&
                finalProductInfo.moduleType === "Module D" ? (
                <Text
                  style={{
                    fontSize: 11,
                    textAlign: "justify",
                    marginBottom: 10,
                  }}
                >
                  {t(language, "notified.moduleD", {
                    bodyName: selectedBodyDetails.name,
                    bodyNumber: selectedBodyDetails.number,
                    certificateNo: finalProductInfo.certificateNo,
                  })}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 11,
                    textAlign: "justify",
                    marginBottom: 10,
                  }}
                >
                  {t(language, "notified.other", {
                    bodyName: selectedBodyDetails.name,
                    bodyNumber: selectedBodyDetails.number,
                    certificateNo: finalProductInfo.certificateNo,
                    moduleType: finalProductInfo.moduleType,
                  })}
                </Text>
              )}
            </View>
          )}
        {/* Notified Address & Signature Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {/* Left column – Notified Address */}
          {selectedBodyDetails && (
            <View style={{ flex: 1, marginRight: 20 }}>
              <Text style={{ fontSize: 11, marginBottom: 3 }}>
                {selectedBodyDetails.name}
              </Text>
              <Text style={{ fontSize: 11, marginBottom: 3 }}>
                Notified Body No. {selectedBodyDetails.number}
              </Text>
              <Text style={{ fontSize: 11, marginBottom: 3 }}>
                {selectedBodyDetails.address}
              </Text>
              <Text style={{ fontSize: 11, marginBottom: 3 }}>
                {selectedBodyDetails.zipCode}, {selectedBodyDetails.country}
              </Text>
            </View>
          )}

          {/* Right column – Signature Section */}
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            {signatureSrc && (
              <>
                <Image
                  src={signatureSrc}
                  style={{ width: 120, marginBottom: 3 }}
                  fixed
                />
                <Text style={{ fontSize: 11 }}>
                  {t(language, "product.safety.manager")}
                </Text>
                {signerName && (
                  <Text style={{ fontSize: 11 }}>{signerName}</Text>
                )}
                <Text style={{ fontSize: 11 }}>{formattedDate}</Text>
              </>
            )}
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            bottom: 10,
            left: 40,
            right: 40,
            fontSize: 10,
            color: "grey",
          }}
          fixed
        >
          <Text>www.bastadgruppen.com</Text>
          <Text>Båstadgruppen AB</Text>
          <Text>0046123413445</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocPdfTemplate;
