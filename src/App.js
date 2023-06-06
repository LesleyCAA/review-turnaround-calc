import React, { useState } from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, FormControl, Button } from "@mui/material";
import Lesley from "./images/Lesley.svg";
import { DatePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addBusinessDays, format } from "date-fns";

function App() {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#02945d",
      },
    },
  });

  const [pages, setPages] = useState(0);

  const [dueDate, setDueDate] = useState();

  const [returnDate, setReturnDate] = useState();

  const setDate = (days) => {
    const date = addBusinessDays(new Date(dueDate), days);

    date.setHours(17, 0, 0, 0);

    setReturnDate(format(date, "MM/dd/yyyy h:mm aa"));
  };

  const calculateReturnDate = () => {
    if (pages <= 10) {
      setDate(2);
    } else {
      const estimatedDays = Math.ceil(pages / 10) * 2;

      setDate(estimatedDays);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <a className="skip-to-content-link" href="#main">
        Skip to content
      </a>
      <header>
        <div className="bg-white pl-[20px] lg:pl-[110px] py-[10px]">
          <img alt="Lesley University logo" src={Lesley} width={120}></img>
        </div>
        <div id="container" className="bg-[#004b44] min-h-[120px]">
          <div id="triangle"></div>
          <div className="flex">
            <div className="w-full pt-[40px]">
              <h1 className="pl-[20px] lg:pl-[110px] text-2xl lg:text-4xl text-white">
                Review Turnaround Calculator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main id="main" className="flex self-center px-4 items-center flex-col">
        <section className="my-8 lg:my-16 mb-8 lg:w-[900px] py-12 px-6 lg:px-12 text-[18px] lg:text-[22px] bg-gray-200">
          <FormControl className="space-y-10 text-left w-full">
            <div className="flex items-center justify-between">
              <p className="pr-6">How long is your paper?</p>
              <TextField
                type="number"
                id="pages"
                label="Pages"
                variant="outlined"
                onChange={(event) => {
                  setPages(event.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="pr-6">
                When will you submit your paper for review?
              </p>
              <DatePicker
                onChange={(newValue) => setDueDate(newValue)}
                label="Submission Date"
              />
            </div>

            <div className="flex justify-end w-full">
              <ThemeProvider theme={theme}>
                <Button
                  disabled={pages > 0 && dueDate ? false : true}
                  color="primary"
                  variant="contained"
                  onClick={calculateReturnDate}
                >
                  Calculate
                </Button>
              </ThemeProvider>
            </div>
          </FormControl>
        </section>
        <section className="lg:w-[900px] px-4 mb-4">
          <div className="space-y-4">
            <p>
              Based on your page count and submission date, we estimate a return
              date of:{" "}
              <span
                id="return-date"
                tabIndex={0}
                className="font-bold text-[#02945d]"
              >
                {returnDate}
              </span>
            </p>
            <p className="text-sm italic">
              Note: Papers submitted after 5:00 pm EST are recognized as
              “received” on the following business day. Please plan accordingly,
              as this may impact your turnaround time. Lesley-observed holidays
              may also impact this estimate.
            </p>
          </div>
        </section>
      </main>
      <footer className="min-h-[20px]"></footer>
    </LocalizationProvider>
  );
}

export default App;
