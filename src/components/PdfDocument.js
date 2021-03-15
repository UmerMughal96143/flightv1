import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  movieDetails: {
    display: "flex",
    marginLeft: 5,
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12,
  },
  vote: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    fontSize: 10,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff",
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4,
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row",
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: "bold",
  },
});

const PdfDocument = ({ peoples }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {peoples &&
          peoples.map((peo) => {
            return (
              <View style={styles.movieContainer}>
                <View style={styles.movieDetails}>
                  <Text
                    style={styles.movieTitle}
                  >{`Person ${peo.firstName} ${peo.lastName}`}</Text>
                  <View style={styles.subtitle}>
                    <View style={styles.vote}>
                      <Text style={styles.vote_text}>Reference ID :</Text>
                      <Text style={styles.vote_pop}>{peo._id}</Text>
                      <Text style={styles.vote_text}>
                        {" "}
                        Please have you photo ID present at the appointment as
                        we will be required to take a photo of it. We will not
                        be able to issue your test results without taking photo
                        ID
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
      </Page>
    </Document>
  );
};

export default PdfDocument;
