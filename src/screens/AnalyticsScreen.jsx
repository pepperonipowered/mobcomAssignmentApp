import React, { useState, useEffect } from "react";
import CustomTopBar from "../components/CustomTopBar";
import { collection, query, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions, ScrollView } from "react-native";

const AnalyticsScreen = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const fetchAndAnalyzeData = () => {
    const assignmentsCollection = collection(FIREBASE_DB, "assignments");
    const assignmentsQuery = query(assignmentsCollection);

    const unsubscribeAssignments = onSnapshot(
      assignmentsQuery,
      (querySnapshot) => {
        let assignmentsByDate = {};
        let totalAssignments = 0;

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            let data = doc.data();
            totalAssignments++;

            let createdAt = data.createdAt.toDate();
            let dateStr = String(createdAt.getDate()).padStart(2, "0");

            if (!assignmentsByDate[dateStr]) {
              assignmentsByDate[dateStr] = 1;
            } else {
              assignmentsByDate[dateStr]++;
            }
          }
        });

        let dates = Object.keys(assignmentsByDate).sort();
        let counts = dates.map((date) => assignmentsByDate[date]);

        const subjectsCollection = collection(FIREBASE_DB, "subjects");
        const subjectsQuery = query(subjectsCollection);

        onSnapshot(subjectsQuery, (subjectsSnapshot) => {
          let totalSubjects = subjectsSnapshot.size;

          setChartData({
            labels: dates,
            datasets: [
              {
                data: counts,
              },
            ],
            totalAssignments,
            totalSubjects,
          });
        });
      }
    );

    return () => {
      unsubscribeAssignments();
    };
  };

  useEffect(() => {
    const unsubscribe = fetchAndAnalyzeData();
    return unsubscribe;
  }, []);

  if (
    !chartData.labels.length ||
    !chartData.datasets.length ||
    !chartData.datasets[0].data.length
  ) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <CustomTopBar title={`Analytics`} />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <LineChart
          data={chartData}
          width={chartData.labels.length * 60}
          height={500}
          yAxisLabel=""
          xAxisLabel=""
          chartConfig={{
            backgroundColor: "#D1C4E9",
            backgroundGradientFrom: "#B39DDB",
            backgroundGradientTo: "#9575CD",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 1,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginTop: 30,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              padding: 20,
              backgroundColor: "#D1C4E9",
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#000" }}>
              Total Assignments: {chartData.totalAssignments}
            </Text>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: "#D1C4E9",
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#000" }}>
              Total Subjects: {chartData.totalSubjects}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnalyticsScreen;
