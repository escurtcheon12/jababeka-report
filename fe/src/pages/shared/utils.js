import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const formulaRating = (number) => {
  let arr = [];

  if (number == 0) {
    return;
  }

  if (number <= 20) {
    return (
      <FontAwesomeIcon className="text-warning icon_ratings" icon={faStar} />
    );
  } else if (number >= 21 && number <= 40) {
    for (let i = 1; i <= 2; i++) {
      arr.push(
        <FontAwesomeIcon
          key={i}
          className="text-warning icon_ratings"
          icon={faStar}
        />
      );
    }
  } else if (number >= 41 && number <= 60) {
    for (let i = 1; i <= 3; i++) {
      arr.push(
        <FontAwesomeIcon
          key={i}
          className="text-warning icon_ratings"
          icon={faStar}
        />
      );
    }
  } else if (number >= 61 && number <= 80) {
    for (let i = 1; i <= 4; i++) {
      arr.push(
        <FontAwesomeIcon
          key={i}
          className="text-warning icon_ratings"
          icon={faStar}
        />
      );
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      arr.push(
        <FontAwesomeIcon
          key={i}
          className="text-warning icon_ratings"
          icon={faStar}
        />
      );
    }
  }

  return arr;
};

export const convertTimeToJs = (date) => {
  let a = date + "";
  let b = a.slice(0, 10).replace("T", " ");

  let splt = b.split("");

  let d = splt.slice(0, 4);
  let e = splt.slice(5, 7);
  let f = splt.slice(8, 10);

  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  let combine = d.join("") + "/" + e.join("") + "/" + f.join("");
  let lastResult = new Date(combine);

  let result =
    f.join("") + " " + month[lastResult.getMonth()] + ", " + d.join("");
  return result;
};

export const onInputChange = (key, value, form, setForm) => {
  setForm({
    ...form,
    [key]: value.target.value,
  });
};
