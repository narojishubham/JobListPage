import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import "../css/Search.css";
import axios from "axios";

import JobsList from "./JobsList";

function SearchFilter() {
  const [searchText, setSearchText] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState(
    JSON.parse(localStorage.getItem("department"))
  );
  const [selectedLocation, setSelectedLocation] = useState(
    JSON.parse(localStorage.getItem("location"))
  );
  const [selectedFunction, setSelectedFunction] = useState(
    JSON.parse(localStorage.getItem("function1"))
  );
  const [retainFilter, setRetainFilter] = useState(
    JSON.parse(localStorage.getItem("retainFilter")) || []
  );
  const [DeparmentsOptions, setDeparmentsOptions] = useState([]);
  const [LocationOptions, setLocationOptions] = useState([]);
  const [FunctionsOptions, setFunctionsOptions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showFilter, setShowFilter] = useState();
  const [filteredDepartment, setFilteredDepartment] = useState([]);

  const [localStorageDepartment, setLocalstorageDep] = useState();
  useEffect(() => {
    setLocalstorageDep(
      JSON.parse(localStorage.getItem("department")) || selectedDepartment
    );
  }, [selectedDepartment]);

  const [localStorageLocation, setLocalstorageLoc] = useState();
  useEffect(() => {
    setLocalstorageLoc(
      JSON.parse(localStorage.getItem("location")) || selectedLocation
    );
  }, [selectedLocation]);

  const [localStorageFunction, setLocalstorageFuc] = useState();
  useEffect(() => {
    setLocalstorageFuc(
      JSON.parse(localStorage.getItem("function1")) || selectedFunction
    );
  }, [selectedFunction]);
  const getDepartment = async () => {
    try {
      const response = await axios.get(
        "https://demo.jobsoid.com/api/v1/departments"
      );

      setDeparmentsOptions(
        response.data.map((dept) => {
          return {
            name: dept.title,
            id: dept.id,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async () => {
    try {
      const response = await axios.get(
        "https://demo.jobsoid.com/api/v1/locations"
      );

      setLocationOptions(
        response.data.map((dept) => {
          return {
            name: dept.title,
            id: dept.id,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getFunctions = async () => {
    try {
      const response = await axios.get(
        "https://demo.jobsoid.com/api/v1/functions"
      );

      setFunctionsOptions(
        response.data.map((dept) => {
          return {
            name: dept.title,
            id: dept.id,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getJobs = async () => {
    try {
      const response = await axios.get("https://demo.jobsoid.com/api/v1/jobs", {
        headers: {
          Accept: "application/json",
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getJobsSorting = async (Department, Location, Function1) => {
    try {
      let response = await axios.get(
        `https://demo.jobsoid.com/api/v1/jobs?q=&dept=${Department?.id}&loc=${Location?.id}&fun=${Function1?.id}`
      );
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getJobsSearch = async (searchText) => {
    try {
      let response = await axios.get(
        `https://demo.jobsoid.com/api/v1/jobs?q=${searchText}&dept=&loc=&fun=`
      );
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeFilter = (e) => {
    if (filteredDepartment.find((item) => item.id === e.value.id)) {
      return;
    }
    setFilteredDepartment([...filteredDepartment, e.value]);
  };

  const handleRemoveFilter = (id) => {
    setFilteredDepartment(filteredDepartment.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (filteredDepartment.length > 0) {
      localStorage.setItem("retainFilter", JSON.stringify(filteredDepartment));
      setRetainFilter(JSON.parse(localStorage.getItem("retainFilter")));
      // getJobsSorting(
      //   localStorageDepartment,
      //   localStorageLocation,
      //   localStorageFunction
      // );
    } else {
      setRetainFilter([]);
      setSelectedDepartment([]);
      setSelectedLocation([]);
      setSelectedFunction([]);
      setSearchText("");
      getJobs();
    }
  }, [filteredDepartment]);

  useEffect(() => {
    if (showFilter?.length > 0) {
      setTimeout(() => {
        getJobsSorting(
          localStorageDepartment,
          localStorageLocation,
          localStorageFunction
        );
      }, 1000);
    }
  }, [localStorageDepartment, localStorageLocation, localStorageFunction]);

  const clearAllFilter = (e) => {
    e.preventDefault();
    setFilteredDepartment([]);
    setRetainFilter([]);
    setLocalstorageFuc();
    setLocalstorageDep();
    setLocalstorageLoc();
    localStorage.removeItem("retainFilter");
    localStorage.setItem("retainFilter", JSON.stringify(filteredDepartment));
    localStorage.removeItem("department");
    localStorage.removeItem("location");
    localStorage.removeItem("function1");
  };

  const onHandleSearch = (e) => {
    e.preventDefault();
    getJobsSearch(searchText);
  };

  useEffect(() => {
    getDepartment();
    getFunctions();
    getLocation();
    getJobs();
  }, []);
  useEffect(() => {
    setShowFilter(JSON.parse(localStorage.getItem("retainFilter")));
  }, [retainFilter]);

  return (
    <div style={{ width: " 1300px", margin: "0 auto" }}>
      <div className="searchBox">
        <div className="input-group">
          <input
            type="text"
            className="search form-control"
            placeholder="Search for Job"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="input-group-btn">
            <button className="btn btn-link" type="button">
              <FontAwesomeIcon
                icon={faClose}
                className="closeButton"
                onClick={() => {
                  setSearchText("");
                }}
              />
            </button>
            <button className="btn btn-link" type="button">
              <FontAwesomeIcon icon={faSearch} onClick={onHandleSearch} />
            </button>
          </div>
        </div>

        <div className="filter mt-3">
          <div className="row mb-3">
            <div className="col">
              <Dropdown
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.value), handleChangeFilter(e);
                  localStorage.setItem("department", JSON.stringify(e.value));
                  getJobsSorting(e.value, selectedLocation, selectedFunction);
                }}
                placeholder="Department"
                className="dept-dropdown"
                optionLabel="name"
                filter
                options={DeparmentsOptions}
              ></Dropdown>
            </div>
            <div className="col">
              <Dropdown
                placeholder="Location"
                className="location-dropdown"
                filter
                optionLabel="name"
                options={LocationOptions}
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.value), handleChangeFilter(e);
                  localStorage.setItem("location", JSON.stringify(e.value));
                  getJobsSorting(selectedDepartment, e.value, selectedFunction);
                }}
              ></Dropdown>
            </div>
            <div className="col">
              <Dropdown
                placeholder="Function"
                className="function-dropdown"
                options={FunctionsOptions}
                value={selectedFunction}
                onChange={(e) => {
                  setSelectedFunction(e.value), handleChangeFilter(e);
                  localStorage.setItem("function1", JSON.stringify(e.value));
                  getJobsSorting(selectedDepartment, selectedLocation, e.value);
                }}
                optionLabel="name"
                filter
              ></Dropdown>
            </div>
          </div>
        </div>
      </div>
      {showFilter?.length > 0 && (
        <div className="filter-selected">
          <a className="pull-right" onClick={clearAllFilter}>
            Clear All
          </a>
          {showFilter?.map((item, idx) => (
            <>
              <span key={idx}>
                <a>
                  {item.name}
                  <FontAwesomeIcon
                    icon={faClose}
                    className="filter-icon"
                    onClick={() => handleRemoveFilter(item.id)}
                  />
                </a>
              </span>
            </>
          ))}
        </div>
      )}

      <JobsList jobs={jobs} />
    </div>
  );
}

export default SearchFilter;
