import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  dropdownButton: {
    height: 50,
    borderWidth: 0.7,
    borderColor: "lightgray",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  dropdownButtonContent: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingRight: 10,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    flex: 1,
    maxHeight: "auto",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  searchInput: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "lightgray",
    marginBottom: 10,
    paddingLeft: 15,
  },
  dropdownItem: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  itemText: {
    fontSize: 16,
    color: colors.baseColor,
  },
});

export default styles;
