/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import "../css/Search.css";
import axios from "axios";

import JobsList from "./JobsList";

function SearchFilter() {
  const [searchText, setSearchText] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [retainFilter, setRetainFilter] = useState(
    JSON.parse(localStorage.getItem("retainFilter")) || []
  );
  const [DeparmentsOptions, setDeparmentsOptions] = useState([]);
  const [LocationOptions, setLocationOptions] = useState([]);
  const [FunctionsOptions, setFunctionsOptions] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [filteredDepartment, setFilteredDepartment] = useState([]);

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

  const getJobsSorting = async () => {
    try {
      let response = await axios.get(
        `https://demo.jobsoid.com/api/v1/jobs?q=${searchText}&dept=${selectedDepartment?.id}&loc=${selectedLocation?.id}&fun=${selectedFunction?.id}`
      );

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeFilter = (e) => {
    //don't take duplicate values
    if (filteredDepartment.find((item) => item.id === e.value.id)) {
      return;
    }
    setFilteredDepartment([...filteredDepartment, e.value]);

    //filter Data
  };

  const handleRemoveFilter = (id) => {
    setFilteredDepartment(filteredDepartment.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (filteredDepartment.length > 0) {
      localStorage.setItem("retainFilter", JSON.stringify(filteredDepartment));
      setRetainFilter(JSON.parse(localStorage.getItem("retainFilter")));
      getJobsSorting();
    } else {
      setRetainFilter([]);
      setSelectedDepartment([]);
      setSelectedLocation([]);
      setSelectedFunction([]);
      setSearchText("");
      getJobs();
      localStorage.setItem("retainFilter", JSON.stringify(filteredDepartment));
    }
  }, [filteredDepartment]);

  const clearAllFilter = (e) => {
    e.preventDefault();
    setFilteredDepartment([]);
    setRetainFilter([]);
    localStorage.setItem("retainFilter", JSON.stringify(filteredDepartment));
  };

  const onHandleSearch = (e) => {
    e.preventDefault();
    getJobsSorting();
  };

  useEffect(() => {
    getDepartment();
    getFunctions();
    getLocation();
    getJobs();
  }, []);

  return (
    <div>
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
                }}
                optionLabel="name"
                filter
              ></Dropdown>
            </div>
          </div>
        </div>
      </div>

      {retainFilter?.length > 0 && (
        <div className="filter-selected">
          <a className="pull-right" onClick={clearAllFilter}>
            Clear All
          </a>
          {retainFilter?.map((item, idx) => (
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
