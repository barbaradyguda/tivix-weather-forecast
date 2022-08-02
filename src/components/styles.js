export const styles = {
  mainContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },

  searchContainer: {
    p: 3
  },
  gridContainer: {
    width: { xl: "44%", lg: "70%", md: "78%", xs: "90%" },
    display: "flex",
    alignItems: "center"
  },
  weatherBox: {
    flexGrow: 1,
    backgroundColor: "white",
    m: 1,
    height: "100%",
    borderRadius: 12,
    boxShadow: "1px 1px #eaeaea",
    border: "1px solid #e7e7e7",
    p: 3
  },
  gridItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 3,
    borderBottom: "1px solid #dedede"
  },
  mainTemperatureValue: {
    fontSize: 40, 
    fontWeight: 500
  },
  cityValue:{
    textAlign: "right", 
    fontSize: 26
  },
  dateValue: {
    textAlign: "right",
     fontSize: 18,
      opacity: 0.8
  },
  gridItemLeft: {
    display: "flex", 
    flexDirection: "column", 
    width: 200
  },
  gridItemRight: {
    display: "flex", 
    flexDirection: "column", 
    width: 250
  },
  alignLeft: {
    textAlign: "left" 
  },
  alignRight: {
    textAlign: "right"
  },
  modesBox:{
    display: "flex", 
    justifyContent: "end"
  }
};
