import * as Analytics from "expo-firebase-analytics";
import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import CustomTopBar from "../components/CustomTopBar";
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { LineChart } from "react-native-chart-kit";

const AnalyticsScreen = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalAssignments: -1,
    totalSubjects: -1,
    todayAssignments: -1,
    todaySubjects: -1,
  });

  const fetchAndAnalyzeData = () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const assignmentsQuery = collection(FIREBASE_DB, "assignments");
    const subjectsQuery = collection(FIREBASE_DB, "subjects");
    const todayAssignmentsQuery = query(
      collection(FIREBASE_DB, "assignments"),
      where("createdAt", ">=", startOfToday)
    );
    const todaySubjectsQuery = query(
      collection(FIREBASE_DB, "subjects"),
      where("createdAt", ">=", startOfToday)
    );

    const unsubscribeAssignments = onSnapshot(
      assignmentsQuery,
      (querySnapshot) => {
        let assignmentsCount = 0;

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            assignmentsCount++;
            Analytics.logEvent("new_assignment", { name: doc.data().title });
          }
        });

        setAnalyticsData((prevState) => ({
          ...prevState,
          totalAssignments: assignmentsCount,
        }));
      }
    );

    const unsubscribeTodayAssignments = onSnapshot(
      todayAssignmentsQuery,
      (querySnapshot) => {
        let todayAssignmentsCount = 0;

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            todayAssignmentsCount++;
          }
        });

        setAnalyticsData((prevState) => ({
          ...prevState,
          todayAssignments: todayAssignmentsCount,
        }));
      }
    );

    const unsubscribeSubjects = onSnapshot(subjectsQuery, (querySnapshot) => {
      let subjectsCount = 0;

      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          subjectsCount++;
          Analytics.logEvent("new_subject", { name: doc.data().name });
        }
      });

      setAnalyticsData((prevState) => ({
        ...prevState,
        totalSubjects: subjectsCount,
      }));
    });

    const unsubscribeTodaySubjects = onSnapshot(
      todaySubjectsQuery,
      (querySnapshot) => {
        let todaySubjectsCount = 0;

        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            todaySubjectsCount++;
          }
        });

        setAnalyticsData((prevState) => ({
          ...prevState,
          todaySubjects: todaySubjectsCount,
        }));
      }
    );

    return () => {
      unsubscribeAssignments();
      unsubscribeTodayAssignments();
      unsubscribeSubjects();
      unsubscribeTodaySubjects();
    };
  };

  useEffect(() => {
    const unsubscribe = fetchAndAnalyzeData();
    return unsubscribe;
  }, []);

  const data = {
    labels: ["Assignments", "Subjects"],
    datasets: [
      {
        data: [analyticsData.todayAssignments, analyticsData.todaySubjects],
      },
    ],
  };

  return (
    <View>
      <CustomTopBar title={`Analytics`} />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 16}
          height={500}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#D1C4E9",
            backgroundGradientFrom: "#B39DDB",
            backgroundGradientTo: "#9575CD",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
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
              Total Assignments: {analyticsData.totalAssignments}
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
              Total Subjects: {analyticsData.totalSubjects}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnalyticsScreen;
