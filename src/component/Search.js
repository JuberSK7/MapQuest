import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const NOMINITE_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  formate: "json",
  addressdetails: "addressdetails",
};

const Search = (props) => {
  const { location, setLocation } = props;
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
 
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", margin: "22px" }}>
          <div>
            <TextField
              id="outlined-basic"
              label="Search Place"
              variant="outlined"
              sx={{ width: "400px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ padding: "14px 34px" }}
              onClick={() => {
                const params = {
                  q: search,
                  format: "json",
                  addressdetails: 1,
                  polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOption = {
                  method: "GET",
                  redirect: "follow",
                };
                fetch(`${NOMINITE_BASE_URL}${queryString}`, requestOption)
                  .then((response) => response.text())
                  .then((result) => {
                    setPlaces(JSON.parse(result));
                  })
                  .catch((err) => console.log("error", err));
              }}
            >
              Search
            </Button>
          </div>
        </div>
        <List>
          {places.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    setLocation(item);
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <img
                        src="https://w7.pngwing.com/pngs/1000/644/png-transparent-google-maps-google-search-google-map-maker-computer-icons-map-angle-search-engine-optimization-map-thumbnail.png"
                        style={{ height: "24px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item?.display_name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </>
  );
};
export default Search;
