import React, { useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, setOptions } from "@mobiscroll/react";



function Date({datValueFromPicker}) {
    
  
  return (
    <Page>
      <Datepicker display="anchored" dateFormat="DD.MM.YYYY" touchUi={true} onChange={(e) => datValueFromPicker(e)} inputProps={{placeholder : 'dd/mm/yyyy'}}/>
    </Page>
  );
}


export default Date