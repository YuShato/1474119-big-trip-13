import Sorter from "./sorter.js";
import {generateTemplatesUsingClass} from "../../utils/utils.js";

const sorters = [
  {
    name: `Day`,
    isChecked: true,
    isDisable: false
  },
  {
    name: `Event`,
    isChecked: false,
    isDisable: true
  },
  {
    name: `Time`,
    isChecked: false,
    isDisable: false
  },
  {
    name: `Price`,
    isChecked: false,
    isDisable: false
  },
  {
    name: `Offers`,
    isChecked: false,
    isDisable: true
  }
];

export const generateSorterTemplatesHtml = () => generateTemplatesUsingClass(sorters, Sorter);
