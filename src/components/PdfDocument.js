import React from "react";
import pic from "./logo.png";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { autoDetect } from "@mobiscroll/react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column"
  },
  image: {
    width: "50%",
    padding: 10
  },
  centerImage: {
    alignItems: "center",
    flexGrow: 1
  },
  text: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 50,
    paddingVertical: 30,
    fontSize: 14,
    color: "#212121"
  }
});

const PdfDocument = ({ peoples }) => {
  return (
    <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.centerImage}>
        <Image style={styles.image} src={pic} />
      </View>
      <Text style={styles.text}>
        PSPDFKit GmbH is the leading cross-platform SDK solution for integrating
        PDF support on all major platforms: iOS, Android, Windows, macOS, and on
        Web (both server-based and standalone via WebAssembly).
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      
      <Text style={styles.text}>
        Learn more at
      </Text>
    </Page>
  </Document>
    // <Document>
    //   <Page style={StyleSheet.wrapper}>
    //     {/* <View style={styles.PDF_logo}>
    //       <Image
    //         src={pic}
    //         alt="image"
    //       />
    //     </View> */}
    //     <View>
    //       <View>
    //         <View className="main-navbar-1 navbar navbar-expand-lg navbar-light position-relative">
    //           <Image class="dark-logo" src={pic} alt="image" />
    //         </View>
    //       </View>
    //     </View>
    //     {peoples &&
    //       peoples.map((peo) => {
    //         return (
    //           <View class="Booking-Complete-person-data-box">
    //             <View class="Booking-Complete-person-data-box-header">
    //               <Text class="Booking-person-info">
    //                 Patient Name :{" "}
    //                 <Text>
    //                   {peo.firstName} {peo.lastName}
    //                 </Text>
    //               </Text>
    //               <Text class="Booking-person-identity">
    //                 Booking Refrence ID: <Text>{peo.referenceId}</Text>
    //               </Text>
    //               <Text class="Booking-Texterson-dec">
    //                 Please have you photo ID present at the appointment as we
    //                 will be required to take a photo of it. We will not be able
    //                 to issue your test results without taking photo ID
    //               </Text>
    //             </View>
    //           </View>
    //         );
    //       })}
    //   </Page>
    // </Document>
  );
};

export default PdfDocument;
